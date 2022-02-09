/**
 * Global singleton of {@code SessionManager}.
 */
export const sessionManager: SessionManager;
/**
 * SessionManager manages the metadata of each segment during each local
 * recording session.
 *
 * A segment is a continuous portion of recording done using the same adapter
 * on the same microphone device.
 *
 * Browser refreshes, switching of microphone will cause new segments to be
 * created.
 *
 * A recording session can consist of one or more segments.
 */
declare class SessionManager {
    /**
     * Loads metadata from localStorage.
     *
     * @private
     * @returns {void}
     */
    private _loadMetadata;
    _sessionsMetadata: any;
    /**
     * Persists metadata to localStorage.
     *
     * @private
     * @returns {void}
     */
    private _saveMetadata;
    /**
     * Creates a session if not exists.
     *
     * @param {string} sessionToken - The local recording session token.
     * @param {string} format - The local recording format.
     * @returns {void}
     */
    createSession(sessionToken: string, format: string): void;
    /**
     * Gets all the Sessions.
     *
     * @returns {SessionInfo[]}
     */
    getSessions(): SessionInfo[];
    /**
     * Removes session metadata.
     *
     * @param {string} sessionToken - The session token.
     * @returns {void}
     */
    removeSession(sessionToken: string): void;
    /**
     * Get segments of a given Session.
     *
     * @param {string} sessionToken - The session token.
     * @returns {SegmentInfo[]}
     */
    getSegments(sessionToken: string): SegmentInfo[];
    /**
     * Marks the start of a new segment.
     * This should be invoked by {@code RecordingAdapter}s when they need to
     * start asynchronous operations (such as switching tracks) that interrupts
     * recording.
     *
     * @param {string} sessionToken - The token of the session to start a new
     * segment in.
     * @returns {number} - Current segment index.
     */
    beginSegment(sessionToken: string): number;
    /**
     * Gets the current segment index. Starting from 0 for the first
     * segment.
     *
     * @param {string} sessionToken - The session token.
     * @returns {number}
     */
    getCurrentSegmentIndex(sessionToken: string): number;
    /**
     * Marks the end of the last segment in a session.
     *
     * @param {string} sessionToken - The session token.
     * @returns {void}
     */
    endSegment(sessionToken: string): void;
    /**
     * Constructs an array of {@code SegmentInfo} from an array of
     * {@code SessionEvent}s.
     *
     * @private
     * @param {SessionEvent[]} events - The array of {@code SessionEvent}s.
     * @returns {SegmentInfo[]}
     */
    private _constructSegments;
}
export {};
