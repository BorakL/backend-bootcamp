import { Query } from "mongoose";

class APIFeatures<T extends Document>{
    queryResult: Query<T[],T>;
    queryString: Record<string,any>;

    constructor(queryResult: Query<T[],T>, queryString:Record<string,any>){
        this.queryResult = queryResult;
        this.queryString = queryString;
    }

    filter(){
        const queryObj = {...this.queryString};
        const excludedFields = ['page','sort','limit','fields'];
        excludedFields.forEach(e => delete queryObj[e]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=> `$${match}`);
        this.queryResult = this.queryResult.find(JSON.parse(queryStr))
        return this;
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.queryResult = this.queryResult.sort(sortBy)
        }else {
            this.queryResult = this.queryResult.sort('-createdAt')
        }
        return this;
    }

    limitFields() {
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');
            this.queryResult = this.queryResult.select(fields)
        }else{
             this.queryResult = this.queryResult.select('-__v')
        }
        return this;
    }

    paginate(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page-1) * limit;
        this.queryResult = this.queryResult.skip(skip).limit(limit);
        return this;
    }
    
}

export default APIFeatures;