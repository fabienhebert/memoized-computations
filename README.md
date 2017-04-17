# memoized-computations

Inspired by the great library reselect (https://github.com/reactjs/reselect)

## What is different in this library

### You can provide a "memoization key" at selector call, it really useful if you want to use a selector but in specific case you want to have differents memoizations for differents dynamic sources

Example : you have a collection of 6 books,

By doing the following code, you can generate derived data for each book, but the most important if you change a state data about the second book, only the related object will be regenerated and not the all 6, it is really useful, in a react project using shouldComponentUpdate and really improve your performance.
You can share component between components, make sure the memoization key is correct

```
import { createSelector } from "memoized-computations"

const selectCollectionName = state => state.collection

const selectBooks = function(state) {
  state.collection.items.map(item, index) => {
    selectBook(state, {
        bookState : item,
    }, "collection_item" + index) // YOU CAN SPECIFY THE MEMOIZATION KEY AS 3rd PARAMETER
  }
}

const selectCollection = createSelector(
    [selectCollectionName, selectBooks],
    (collectionName, books) => {
      return {
        name : collectionName,
        books,
        count : books.length,
      }
    }
)
```

```
const selectAuthor = (state, parameters, memoizationKey) => {
  // Memoization key will be "collection_item0",  "collection_item1" and so on ...
  // bookState can be found in parameters.bookState
}

export const selectBook = createSelector(
    [selectAuthor, selectCategoryById],
    (author, cateogy) => {
      return {
        ....
      }
    }
)
```

** If you don't specify a memoization key, the selector will compare sources/inputs values with its previous one (even if the previous call used a memoization key) :**

```
selectAmazingStuff(state, stuff1, "stuff1") // First computation for this key, saving in global memoization with key "stuff1"
selectAmazingStuff(state, stuff1, "stuff2") // First computation for this key, saving in global memoization with key "stuff2"
selectAmazingStuff(state, stuff1, "stuff1") // Second computation, comparing with memoization data for key "stuff1"
selectAmazingStuff(state, stuff1) // No memoization calculation, the sources values will be compared with the previous one, "stuff1"
selectAmazingStuff(state, stuff1, "stuff2") // Second computation, comparing with memoization data for key "stuff2"
```

### Specific comparator for specific source

Instead of comparing all values with the same comparator (default : ===), you can change it for a specific source  :

```
import { createSelector, shallowComparator } from "memoized-computations"

const selectCollection = createSelector(
    [selectCollectionName, shallowComparator(selectBooks)],
    (collectionName, books) => {
      // ....
    }
)
```

collectionName will be comparated with its previous value using "===" but books will be comparated using shallow equal comparaison
