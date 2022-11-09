---
layout: spec
excludeFromSitemap: true
---

# 21 Rummy
{: .primer-spec-toc-ignore }

This game is a variation of 13-card rummy with several additional rules. As with 13-card rummy, play several rounds and try to accumulate the least amount of points across rounds. The player with the least points wins. (Often, players continue playing until someone hits a pre-determined point ceiling, say, 500 points.)

The rules in this document describe the core version of the game. For more advanced rules, see the appendices at the end.

Consider purchasing a [card-holder](https://www.amazon.com/Yellow-Mountain-Imports-Standard-Size-Playing/dp/B016XFYX5I/ref=redir_mobile_desktop?ie=UTF8&aaxitk=qJsiAhIWHPNVz0hF0m8Nrg&hsa_cr_id=8743692920901&ref_=sbx_be_s_sparkle_mcd_asin_0) to help with holding the cards. Also consider using the [digital 21 Rummy Scorekeeper spreadsheet](https://drive.google.com/file/d/1nP_kDydKdTuRviOa-nmUKjKgaQTWFrsz/view?usp=sharing) to track scores.

## Victory conditions
- Form `sets` with all 21 cards in your hand (and turn the extra card face-down to declare your victory.)
- At least **three** of these sets must be `rummies` or `tenalis`.

## Setup
- Combine three standard decks of cards with jokers. Shuffle well and choose a seating order.
- Dealer position rotates clockwise each round.
- Player to the right of the Dealer "cuts" the cards and picks a card from the decks at random to act as the `joker` for the round. (Place this card face-up at the end of the deck so that it is easily visible.)
- Dealer deals 21 cards to each player, starting from the left going clockwise. The dealer also opens one additional card face-up to begin play.
- Player to the left of the dealer begins.

## Play
On their turn, a player can choose from the following actions:
- `scoot`: Resign from the game.
  - "Beginning scoot": Scoot before playing your first round. Accumulate 30 points + any `claims`.
  - "Middle scoot": Scoot any time after playing your first round. Accumulate 60 points + any `claims`.
- Play:
  - Take a card, either from the face-down deck of cards or the latest face-up card in the discard pile.
  - If you meet the [victory conditions](#victory-conditions), place the extra card face-down and show your cards to the other players.
  - Otherwise, discard a card.

## Joker
The player to the right of the dealer selects the `Joker` while dealing. The `Joker` is essentially a wildcard, and can be used to form `dummies` or `triplets`/`quadruplets`.

When a `Joker` has been selected, several cards become "jokers" (wildcards):
- Picture-jokers (with the word "joker" on them) are *always* jokers.
- Cards with the same rank as the face-up joker are also jokers.
- Cards with the same suit as the face-up joker and consecutive rank to the face-up joker are also jokers.

<table>
<tr><td>
<strong>Example 1:</strong> Standard case
<br><br>
Face-up joker: <kbd>9♥︎</kbd>
<br><br>
The following are all jokers:
<ul>
<li>All picture-jokers</li>
<li>All 9's (<kbd>9♣︎</kbd>, <kbd>9♦</kbd>, <kbd>9♥︎</kbd>, <kbd>9♠︎</kbd>)</li>
<li><kbd>8♥︎</kbd>, <kbd>10♥︎</kbd></li>
</ul>
</td></tr>

<tr><td>
<strong>Example 2:</strong> Face-up Ace
<br><br>
Face-up joker: <kbd>A♣︎</kbd>
<br><br>
The following are all jokers:
<ul>
<li>All picture-jokers</li>
<li>All Aces (<kbd>A♣︎</kbd>, <kbd>A♦</kbd>, <kbd>A♥︎</kbd>, <kbd>A♠︎</kbd>)</li>
<li><kbd>K♣︎</kbd>, <kbd>2♣︎</kbd></li>
</ul>
</td></tr>

<tr><td>
<strong>Example 3:</strong> Face-up picture-joker
<br><br>
Face-up joker: <kbd>Picture-joker</kbd>
<br><br>
The following are all jokers:
<ul>
<li>All picture-jokers</li>
<li>All Aces (<kbd>A♣︎</kbd>, <kbd>A♦</kbd>, <kbd>A♥︎</kbd>, <kbd>A♠︎</kbd>)</li>
<li><kbd>K♠︎</kbd>, <kbd>2♠︎</kbd> (notice how the picture-joker is treated <em>almost</em> like an <kbd>A♠︎</kbd>)</li>
</ul>
</td></tr>
</table>

## Scoring
*Consider using the [digital scorekeeper spreadsheet](https://drive.google.com/file/d/1nP_kDydKdTuRviOa-nmUKjKgaQTWFrsz/view?usp=sharing) to keep scores.*

At the end of the round, all players count their points and add it to their total.

- The victorious player accumulates 0 points.
- Other players count the value of their cards **plus** any `claims`.
  - All cards have the same value as their rank (<kbd>9♣︎</kbd> counts as 9 points), face-cards (<kbd>J</kbd>, <kbd>Q</kbd>, <kbd>K</kbd>, <kbd>A</kbd>) count as 10 points each.
  - If the player has three `rummies`/`tenalis`, all correctly formed sets can be excluded from the point-count.
  - If not, any 4+ card `rummies` can be excluded. `Tenalis` can be excluded.
  - `Jokers` can be excluded.
  - The point-ceiling is 100 (before `claims`).
- Players who scooted accumulate a flat amount of points.
  - Beginning scoot: 30 points + claims
  - Middle scoot: 60 points + claims

### Claims
After a player has won the round, they calculate the value of "claim" cards in their hand. These "claim" points are then added to the scores of *all* other players (except those free of claims, see [Scoring](#scoring)).

All picture-jokers and jokers of the same suit as the face-up joker are "claim" cards.
- For instance, if the face-up joker is <kbd>2♦</kbd>, then count any <kbd>A♦</kbd>, <kbd>2♦</kbd>, <kbd>3♦</kbd> or picture-jokers in your hand as "claim" cards.
- If the face-up joker is the picture-joker, then count any <kbd>K♠︎</kbd>, <kbd>2♠︎</kbd> or picture-jokers in your hand as "claim" cards. (Note that <kbd>A♠︎</kbd> is *not* a "claim" card in this case.)

Each "claim" card is worth 10 "claim" points. If the player has a `mini-marriage`, the three cards combined are worth 50 "claim" points. A `marriage` is worth 100 "claim" points!
Total these "claim" points and add to other people's scores.

## Definitions
Some of the definitions listed here correspond are only used in the appendices.

- `set`: Either a `rummy`, `dummy`, `triplet`/`quadruplet` or `tenali`.
- `rummy`: A set of three or more cards of the same suit of consecutive rank.
  - For instance, [<kbd>3♣</kbd>, <kbd>4♣</kbd>, <kbd>5♣</kbd>] is a valid rummy.
  - Aces can be either high or low, but *not both*. For instance, [<kbd>A♠︎</kbd>, <kbd>2♠︎</kbd>, <kbd>3♠︎</kbd>] and [<kbd>Q♠︎</kbd>, <kbd>K♠︎</kbd>, <kbd>A♠︎</kbd>] are valid rummies, but [<kbd>K♠︎</kbd>, <kbd>A♠︎</kbd>, <kbd>2♠︎</kbd>] is **not** valid.
- `dummy`: A rummy, but one of the cards is substituted with a *Joker*.
  - For example, [<kbd>7♥︎</kbd>, <kbd>8♥︎</kbd>, <kbd>Joker</kbd>, <kbd>10♥︎</kbd>] is a valid dummy.
- `triplet`/`quadruplet`: A set of three or four cards with the same rank but *different* suits. A joker may substitute any of the cards.
  - For example, [<kbd>7♥︎</kbd>, <kbd>7♣</kbd>, <kbd>7♠︎</kbd>, <kbd>7♦</kbd>] is a valid quadruplet.
  - [<kbd>5♥︎</kbd>, <kbd>5♣︎</kbd>, <kbd>5♣︎</kbd>] is NOT valid.
  - [<kbd>K♠︎</kbd>, <kbd>K♥︎</kbd>, <kbd>Joker</kbd>] is a valid triplet.
- `tenali`: A set of three identical cards (with the same rank and suit).
  - For instance, [<kbd>7♣︎</kbd>, <kbd>7♣︎</kbd>, <kbd>7♣︎</kbd>] is a valid tenali.
  - [Joker, Joker, Joker] is a valid tenali only if the three cards are exactly identical (either all picture-jokers, or all three cards are the same rank/suit).
- `double`: Two identical cards with the same rank and suit. A `tenali` counts as a single double.
- `marriage`: Three *different* claim-cards of the same suit as the face-up card. Or a `tenali` consisting entirely of claim-cards. A marriage can either be considered as a `rummy` or used as separate jokers in other sets.
  - For instance, if the face-up joker is <kbd>5♥︎</kbd>, then [<kbd>4♥︎</kbd>, <kbd>5♥︎</kbd>, <kbd>6♥︎</kbd>] is a marriage.
  - If the face-up joker is <kbd>A♣︎</kbd>, then [<kbd>K♣︎</kbd>, <kbd>A♣︎</kbd>, <kbd>2♣︎</kbd>] is a marriage, *and can also be counted as a `rummy` if you want*.
  - If the face-up joker is the picture-joker, then [<kbd>K♠︎</kbd>, <kbd>Picture-joker</kbd>, <kbd>2♠︎</kbd>] is a marriage.
- `mini-marriage`: A `tenali` consisting of jokers of the same rank as the face-up joker, but of a different suit. A mini-marriage can be considered as a `tenali`, or used as separate jokers in other sets.
  - For instance, if the face-up joker is <kbd>2♥︎</kbd>, then the `tenali` [<kbd>2♠︎</kbd>, <kbd>2♠︎</kbd>, <kbd>2♠︎</kbd>] is a mini-marriage.
- `scoot`: Resigning from the round. See [Play](#play).
- `claim`: Additional points added to non-winners tallies at the end of each round. See [Claims](#claims).
- `joker`: A wildcard that can be used in `dummies` and `triplets`/`quadruplets`. See [Joker](#joker).

---

(Consider skipping the following sections if you're new to the game.)

## Appendix A: "Abnormal" victory conditions
If you meet any of the following conditions, you win (and the round ends immediately):
- Start the game with 7 `doubles`.
- Start the game with 8 `jokers`.
- At any point in the round, have 8 `doubles` in your hand.
- At any point in the round, have 9 `jokers` in your hand.
- At any point in the round, have 3 `tenalis`.
- At any point in the round, have 2 `marriages` in your hand.

If you meet either of the following conditions at the end of the game, you are free from points and claims — in other words, you accumulate zero points in the round, almost as though you had won the round.
- Have 7 `doubles` in your hand
- Have 8 `jokers` in your hand

## Appendix B: Wrongly declaring victory
As described in [Play](#play), players declare their victory by placing a card face-down on the table. Then they must prove their victory by showing their cards and sets to all other players.

The player is allowed to rearrange the 21 cards in their hands to form sets. (The card that was turned face-down *cannot* be changed.) If the 21 cards do not all form sets, then the victory was *incorrectly declared*. The player who declared incorrectly accumulates 100 points (plus claims). Other players continue playing as usual.

## Appendix C: Kodai Club Protocol
These rules are often followed in addition to the above:
- You are allowed to discard a joker on your turn. But the next player *is not* allowed to pick up that card. (Essentially, throwing a joker can be used to booby-trap the next player.)
  - If the next player picks up the joker and discards another card, they are forced to "middle scoot", sit-out for the rest of the round, and accumulate 60 points + claims.
  - If the next player picks up the joker and declared victory, the victory is considered "wrongly declared" as described in [Appendix B](#appendix-b-wrongly-declaring-victory).
- After a player declared victory, other players *should not* place their own cards on the table before verifying the victory. If the victory is incorrect (as desibed in [Appendix B](#appendix-b-wrongly-declaring-victory)), any players who have placed 3 or more cards on the table are forced to "middle scoot" and sit out the rest of the round.
