import { createStore }from "redux";

//Action generators - functions that create action objects

const incrementCount = ({ incrementBy = 1 } = {}) =>({//using object destructuring
    type: "INCREMENT",
    incrementBy //short for incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: "DECREMENT",
    decrementBy
});

const setCount = ({ count } = {}) => ({
    type: "SET",
    count
});

const resetCount = () => ({
    type: "RESET"
});

//Reducers
//1. Reducers are pure functions
//2. Never change state or action

const countReducer = (state = {count: 0}, action) => {
    switch(action.type){
        case "INCREMENT":
            return {
                count: state.count + action.incrementBy
            };
        case "DECREMENT":
            return {
                count: state.count - action.decrementBy
            };
        case "SET":
            return {
                count: action.count
            };
        case "RESET":
            return {
                count: 0
            };  
        default:
            //first run
            return state;
    }   
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() =>{
    console.log(store.getState());
});

// store.dispatch({
//     type: "INCREMENT",
//     incrementBy: 5
// });

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount({ decrementBy: 10}));

store.dispatch(decrementCount());

store.dispatch(setCount({ count: -100}));