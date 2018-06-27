import moment from "moment";
import filtersReducer from '../../reducers/filters';

test("should set up default filter values", () => {
    //initial state is "@@INIT"
    const state = filtersReducer(undefined, {type: "@@INIT"});
    expect(state).toEqual({
        text: "",
        sortBy: "date",
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
    });
});

test("should set sortBy to amount", () => {
    const state = filtersReducer(undefined, {type: "SORT_BY_AMOUNT"});
    expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
    //because date is the default s
    const currentState = {
        text: "",
        sortBy: "amount",
        startDate: undefined,
        endDate: undefined
    };
    const action = { type: "SORT_BY_DATE"};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe("date");
});

test("should set text filter",() => {
    const state = filtersReducer(undefined, {
        type: "SET_TEXT_FILTER",
        text: "dummy text"
    });
    expect(state.text).toBe("dummy text");
});

test("should set startDate filter", () =>{
    const startDate = moment();
    const state = filtersReducer(undefined, {
        type: "SET_START_DATE",
        startDate
    });
    expect(state.startDate).toEqual(startDate);
});

test("should set endtDate filter", () =>{
    const endDate = moment();
    const state = filtersReducer(undefined, {
        type: "SET_END_DATE",
        endDate
    });
    expect(state.endDate).toEqual(endDate);
});