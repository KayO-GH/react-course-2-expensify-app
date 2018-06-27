import {createStore, combineReducers} from "redux";
import uuid from "uuid";

//Action Generators
// ADD_EXPENSE
const addExpense = ({
    description = "",
    note = "",
    amount = 0,
    createdAt = 0
} = {}) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        note,
        amount, //money in pesewas
        createdAt //timestamp
    }
});

//REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({type: "REMOVE_EXPENSE", id});

//EDIT_EXPENSE
const editExpense = (id, updates) => ({type: "EDIT_EXPENSE", id, updates});

//SET_TEXT_FILTER
const setTextFilter = (text = "") => ({type: "SET_TEXT_FILTER", text});

//SORT_BY_DATE
const sortByDate = () => ({type: "SORT_BY_DATE"});

//SORT_BY_AMOUNT
const sortByAmount = () => ({type: "SORT_BY_AMOUNT"});

//SET_START_DATE
const setStartDate = (startDate) => ({type: "SET_START_DATE", startDate});

//SET_END_DATE
const setEndDate = (endDate) => ({type: "SET_END_DATE", endDate});

//Expenses reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            // push mutates an array, concat merges 2 arrays and returns the resulting array
            // return state.concat(action.expense);//expense was defined in the ADD_EXPENSE
            // action generator
            return [ //spread opreator
                ...state,
                action.expense
            ];
        case "REMOVE_EXPENSE":
            return state.filter(({id}) => id !== action.id);
        case "EDIT_EXPENSE":
            return state.map((expense) => {
                if (expense.id === action.id) 
                    return { //update using object spreading
                        ...expense,
                        ...action.updates
                    }
                });
        default:
            return state;
    }
};

//Filters reducer
const filtersReducerDefaultState = {
    text: "",
    sortBy: "date", //date or amount
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text: action.text
            };
        case "SORT_BY_AMOUNT":
            return {
                ...state,
                sortBy: "amount"
            };
        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy: "date"
            };
        case "SET_START_DATE":
            return {
                ...state,
                startDate: action.startDate
            };
        case "SET_END_DATE":
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

//get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate;
        const textMatch = expense
            .description
            .toLowerCase()
            .includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === "date") {
            return a.createdAt < b.createdAt
                ? 1
                : -1;
        } else if (sortBy === "amount") {
            //greater amount first
            return a.amount > b.amount
                ? -1
                : 1;
        }
    });
};

//store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: "Rent", amount: 100, createdAt: -21000}));
const expenseTwo = store.dispatch(addExpense({description: "Coffee", amount: 300, createdAt: -1000}));

// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500}));
// store.dispatch(setTextFilter("rent")); store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate()); store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());//set startDate to undefined by not passing in
// any argument store.dispatch(setEndDate(2000));

const demoState = {
    expenses: [
        {
            id: "asdfghjkl",
            description: "January Rent",
            note: "This was the final payment for that address",
            amount: 54500, //money in pesewas
            createdAt: 0 //timestamp
        }
    ],
    filters: {
        text: "rent",
        sortBy: "amount", //date or amount
        startDate: undefined,
        endDate: undefined
    }
};