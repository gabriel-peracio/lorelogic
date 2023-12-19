declare global {
  interface ObjectConstructor {
    groupBy<Item, Key extends PropertyKey>(
      items: Iterable<Item>,
      keySelector: (item: Item, index: number) => Key,
    ): Record<Key, Item[]>;
  }
}

export {};
