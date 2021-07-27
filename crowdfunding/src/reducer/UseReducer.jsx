export const initialState = null;

export const reducer = (state, action) => {
    if (action.type === "USER1") {
        return action.payload;
    }
    return state;
}