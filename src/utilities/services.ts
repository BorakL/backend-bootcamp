import { IUser } from "../types/userType";
import { uniq } from "./uniqueId"; 
import fs from 'fs/promises';


const path = `${process.cwd()}/data/users.json`;

const writeData = async (data:IUser[])=>{
    return await fs.writeFile(path, JSON.stringify(data))
}

const getItem = (data:IUser[], id:string)=>{ 
    return data.find(item => item.id===id)
}

const addItem = async (data:IUser[], newItem: IUser) => {
    console.log("new ITem", newItem)
    data.push({...newItem, id:uniq}); 
    return await writeData(data)
}

const removeItem = async(id:string, data:IUser[]) => {
    const filteredData = data.filter(user => user.id!==id)
    return await writeData(filteredData)
}

const updateItem = async (id:string, data:IUser[], newItem:IUser) => {
    const updatedData = data.map(item => {
        if(item.id===id){
            return {...item, ...newItem}
        }else{
            return item;
        }
    })
    return await writeData(updatedData)
}

export {writeData, getItem, addItem, removeItem, updateItem}