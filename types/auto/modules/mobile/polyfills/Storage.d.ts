/**
 * A Web Sorage API implementation used for polyfilling
 * {@code window.localStorage} and/or {@code window.sessionStorage}.
 * <p>
 * The Web Storage API is synchronous whereas React Native's builtin generic
 * storage API {@code AsyncStorage} is asynchronous so the implementation with
 * persistence is optimistic: it will first store the value locally in memory so
 * that results can be served synchronously and then persist the value
 * asynchronously. If an asynchronous operation produces an error, it's ignored.
 */
export default class Storage {
    /**
     * Initializes a new {@code Storage} instance. Loads all previously
     * persisted data items from React Native's {@code AsyncStorage} if
     * necessary.
     *
     * @param {string|undefined} keyPrefix - The prefix of the
     * {@code AsyncStorage} keys to be persisted by this storage.
     */
    constructor(keyPrefix: string | undefined);
    /**
     * The prefix of the {@code AsyncStorage} keys persisted by this
     * storage. If {@code undefined}, then the data items stored in this
     * storage will not be persisted.
     *
     * @private
     * @type {string}
     */
    private _keyPrefix;
    _initializing: Promise<any>;
    /**
     * Removes all keys from this storage.
     *
     * @returns {void}
     */
    clear(): void;
    /**
     * Returns the value associated with a specific key in this storage.
     *
     * @param {string} key - The name of the key to retrieve the value of.
     * @returns {string|null} The value associated with {@code key} or
     * {@code null}.
     */
    getItem(key: string): string | null;
    /**
     * Returns the value associated with a specific key in this {@code Storage}
     * in an async manner. The method is required for the cases where we need
     * the stored data but we're not sure yet whether this {@code Storage} is
     * already initialized (e.g. On app start).
     *
     * @param {string} key - The name of the key to retrieve the value of.
     * @returns {Promise}
     */
    _getItemAsync(key: string): Promise<any>;
    /**
     * Performs asynchronous initialization of this {@code Storage} instance
     * such as loading all keys from {@link AsyncStorage}.
     *
     * @private
     * @returns {Promise}
     */
    private _initializeAsync;
    /**
     * Returns the name of the nth key in this storage.
     *
     * @param {number} n - The zero-based integer index of the key to get the
     * name of.
     * @returns {string} The name of the nth key in this storage.
     */
    key(n: number): string;
    /**
     * Returns an integer representing the number of data items stored in this
     * storage.
     *
     * @returns {number}
     */
    get length(): number;
    /**
     * Removes a specific key from this storage.
     *
     * @param {string} key - The name of the key to remove.
     * @returns {void}
     */
    removeItem(key: string): void;
    /**
     * Adds a specific key to this storage and associates it with a specific
     * value. If the key exists already, updates its value.
     *
     * @param {string} key - The name of the key to add/update.
     * @param {string} value - The value to associate with {@code key}.
     * @returns {void}
     */
    setItem(key: string, value: string): void;
}
