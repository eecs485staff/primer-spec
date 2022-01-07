/** @jsx JSXDom.h */
import * as JSXDom from 'jsx-dom';
import { diffHTMLStrings } from '../diffHTMLStrings';

type JSXElement = string | Node | Array<string | Node>;

function ResultWrapper(props: { children?: JSXElement }) {
  return <body>{props.children}</body>;
}

function ChangesetWrapper(props: { children?: JSXElement }) {
  return <span className="primer-spec-diff">{props.children}</span>;
}

function DeletionWrapper({
  children,
  isText,
}: {
  children?: JSXElement;
  isText?: boolean;
}) {
  if (isText) {
    return <del className="primer-spec-diff-text">{children}</del>;
  }
  return <del>{children}</del>;
}

function InsertionWrapper({
  children,
  isText,
}: {
  children?: JSXElement;
  isText?: boolean;
}) {
  if (isText) {
    return <ins className="primer-spec-diff-text">{children}</ins>;
  }
  return <ins>{children}</ins>;
}

describe('diffHTMLStrings', () => {
  test('single text node with changed text', () => {
    const oldHTML = 'Hello world!';
    const newHTML = 'Hello spam!';
    const diff = diffHTMLStrings(oldHTML, newHTML) as HTMLElement;
    const expectedDiff = (
      <ResultWrapper>
        <span>
          Hello{' '}
          <ChangesetWrapper>
            <DeletionWrapper isText={true}>world!</DeletionWrapper>
            <InsertionWrapper isText={true}>spam!</InsertionWrapper>
          </ChangesetWrapper>
        </span>
      </ResultWrapper>
    );
    expect(diff.outerHTML).toBe(expectedDiff.outerHTML);
  });

  test('single element node with changed text', () => {
    const oldHTML = '<h1>Hello world!</h1>';
    const newHTML = '<h1>Hello spam!</h1>';
    const diff = diffHTMLStrings(oldHTML, newHTML) as HTMLElement;
    const expectedDiff = (
      <ResultWrapper>
        <h1>
          <span>
            Hello{' '}
            <ChangesetWrapper>
              <DeletionWrapper isText={true}>world!</DeletionWrapper>
              <InsertionWrapper isText={true}>spam!</InsertionWrapper>
            </ChangesetWrapper>
          </span>
        </h1>
      </ResultWrapper>
    );
    expect(diff.outerHTML).toBe(expectedDiff.outerHTML);
  });

  test('single element node that is completely different', () => {
    const oldHTML = '<h1>Hello world!</h1>';
    const newHTML = '<p>Hello world!</p>';
    const diff = diffHTMLStrings(oldHTML, newHTML) as HTMLElement;
    const expectedDiff = (
      <ResultWrapper>
        <ChangesetWrapper>
          <DeletionWrapper>
            <h1>Hello world!</h1>
          </DeletionWrapper>
          <InsertionWrapper>
            <p>Hello world!</p>
          </InsertionWrapper>
        </ChangesetWrapper>
      </ResultWrapper>
    );
    expect(diff.outerHTML).toBe(expectedDiff.outerHTML);
  });

  test('element inserted', () => {
    const oldHTML =
      '<h1>Hello world!</h1>' +
      '<div>' +
      '<p>Line 1</p>' +
      '<p>Line 2</p>' +
      '</div>';
    const newHTML =
      '<h1>Hello world!</h1>' +
      '<div>' +
      '<p>Line 1</p>' +
      '<p>INSERTED LINE</p>' +
      '<p>Line 2</p>' +
      '</div>';
    const diff = diffHTMLStrings(oldHTML, newHTML) as HTMLElement;
    const expectedDiff = (
      <ResultWrapper>
        <h1>Hello world!</h1>
        <div>
          <p>Line 1</p>
          <ChangesetWrapper>
            <InsertionWrapper>
              <p>INSERTED LINE</p>
            </InsertionWrapper>
          </ChangesetWrapper>
          <p>Line 2</p>
        </div>
      </ResultWrapper>
    );
    expect(diff.outerHTML).toBe(expectedDiff.outerHTML);
  });

  test('element deleted', () => {
    const oldHTML =
      '<h1>Hello world!</h1>' +
      '<div>' +
      '<p>Line 1</p>' +
      '<p>LINE TO DELETE</p>' +
      '<p>Line 2</p>' +
      '</div>';
    const newHTML =
      '<h1>Hello world!</h1>' +
      '<div>' +
      '<p>Line 1</p>' +
      '<p>Line 2</p>' +
      '</div>';
    const diff = diffHTMLStrings(oldHTML, newHTML) as HTMLElement;
    const expectedDiff = (
      <ResultWrapper>
        <h1>Hello world!</h1>
        <div>
          <p>Line 1</p>
          <ChangesetWrapper>
            <DeletionWrapper>
              <p>LINE TO DELETE</p>
            </DeletionWrapper>
          </ChangesetWrapper>
          <p>Line 2</p>
        </div>
      </ResultWrapper>
    );
    expect(diff.outerHTML).toBe(expectedDiff.outerHTML);
  });

  test('element changed', () => {
    const oldHTML =
      '<h1>Hello world!</h1>' +
      '<div>' +
      '<p>Line 1</p>' +
      '<p>LINE TO CHANGE</p>' +
      '<p>Line 2</p>' +
      '</div>';
    const newHTML =
      '<h1>Hello world!</h1>' +
      '<div>' +
      '<p>Line 1</p>' +
      '<p>LINE HAS CHANGE</p>' +
      '<p>Line 2</p>' +
      '</div>';
    const diff = diffHTMLStrings(oldHTML, newHTML) as HTMLElement;
    const expectedDiff = (
      <ResultWrapper>
        <h1>Hello world!</h1>
        <div>
          <p>Line 1</p>
          <p>
            <span>
              LINE{' '}
              <ChangesetWrapper>
                <DeletionWrapper isText={true}>TO </DeletionWrapper>
                <InsertionWrapper isText={true}>HAS </InsertionWrapper>
              </ChangesetWrapper>
              CHANGE
            </span>
          </p>
          <p>Line 2</p>
        </div>
      </ResultWrapper>
    );
    expect(diff.outerHTML).toBe(expectedDiff.outerHTML);
  });
});
