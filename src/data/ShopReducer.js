import { ActionTypes, DataTypes } from "./Types";

export const ShopReducer = (storeData, action) => {
    switch(action.type) {
        case ActionTypes.DATA_LOAD: // data_load
            return {
                ...storeData, 
                [action.payload.dataType]: action.payload.data,
                [`${action.payload.dataType}_total`]: action.payload.total,
                [`${action.payload.dataType}_params`]: action.payload.params
            };
        case ActionTypes.DATA_SET_PAGESIZE: // data_set_pagesize
            return { ...storeData, pageSize: action.payload }
        case ActionTypes.DATA_SET_SORT_PROPERTY: // data_set_sort
            return { ...storeData, sortKey: action.payload }
        case ActionTypes.DATA_STORE: // data_store
            if (action.payload.dataType === DataTypes.ORDERS) {
                return { ...storeData, 
                        order: action.payload.data 
                }
            }
            break;
    default:
        return storeData || {};
    }
}