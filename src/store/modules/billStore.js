import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
    name: "bill",
    initialState: {
        billList: []
    },
    reducers: {
        setBillList: (state,action) => {
            state.billList = action.payload
        },
        addBill: (state,action) => {
            state.billList.push(action.payload)
        }
    }
})

const { setBillList,addBill } = billStore.actions

const fetchBillList = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3000/data")
        dispatch(setBillList(response.data))
    }
}

const addBillList = (data) => {
    return async (dispatch) => {
        const response = await axios.post("http://localhost:3000/data",data)
        dispatch(addBill(response.data))
    }
}


export { fetchBillList,addBillList } 

const billReducer = billStore.reducer

export default billReducer