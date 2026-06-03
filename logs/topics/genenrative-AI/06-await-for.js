const stream = {
    count: 0, // we can use yield 1, 2...

    // sabhi iterable me next hota hai
    async next() {
        this.count++;
        if (this.count > 5) {
            return { done: true };
        }

        return {
            done: false,
            value: `Chunk ${this.count}`,
        };
    },

    /* The `[Symbol.asyncIterator]()` method is a special method that allows an object to be iterable
    in an asynchronous manner. When an object implements this method, it becomes an asynchronous
    iterable, which means it can be used with `for await...of` loops to iterate over its elements
    asynchronously. */
    [Symbol.asyncIterator]() {
        return this;
    },
};

for await (const chunk of stream) {
    console.log(chunk);
}
