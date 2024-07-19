import { UserType, UserTypeUpdate } from "../types/userType";
import { uniq } from "./uniqueId"; 
import fs from 'fs/promises';

interface NewUserType{
    name: string;
    language: string;
    bio: string;
    version: number
}

const path = `${process.cwd()}/data/users.json`;

const writeData = async (data:UserType[])=>{
    return await fs.writeFile(path, JSON.stringify(data))
}

const getItem = (data:UserType[], id:string)=>{ 
    return data.find(item => item.id===id)
}

const addItem = async (data:UserType[], newItem: NewUserType) => {
    console.log("new ITem", newItem)
    data.push({...newItem, id:uniq}); 
    return await writeData(data)
}

const removeItem = async(id:string, data:UserType[]) => {
    const filteredData = data.filter(user => user.id!==id)
    return await writeData(filteredData)
}

const updateItem = async (id:string, data:UserType[], newItem:UserTypeUpdate) => {
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