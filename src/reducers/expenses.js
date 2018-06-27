//Expenses reducer
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
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
                else
                    return expense;
                });
        default:
            return state;
    }
};

