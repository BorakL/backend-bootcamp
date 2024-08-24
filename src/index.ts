const http = require('http')
const dotenv = require('dotenv')
const express = require("express");
import { Express, Request, Response, NextFunction} from 'express';
import userRouter from './routes/userRouter';
import bodyParser from 'body-parser';
import People from './models/people';
import mongoose from 'mongoose';
dotenv.config();

const app:Express = express();

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const db = process.env.DATABASE || "" 
mongoose.connect(db).then(res=>console.log("database succesfully connected"))

app.use("/api/users", userRouter);

app.use((req:Request, res:Response, next:NextFunction)=>{
    res.send("HEllossa")
})

app.listen(port, ()=>{
    console.log(`Server is running on the port ${port}.`)
})


//Aggregation

//Filtriraj sve koji su žene
//koliko 
const getPerson = async()=>{
    const peoples = await People.aggregate([
        {$match: {gender:"female"}},
        /*
        $group stage zapravo pravi novu kolekciju, zato moramo je obavezno navesti polje _id
        polje _id se koristi da grupiše dokumente, može biti jedno polje, ili više polja. Takođe može biti string vrednosti ili objekat
        pored polja _id moramo imati barem jedno ili više polja čije vrednosti predstavljaju proračune aggreagtion operatora poput:  
         
        - '$sum' - dodaje vrednosti na dato (grupisano) polje, 
        - '$avg' - izračunava prosek za numeričke vrednosti,
        - '$min' - returnuje minimalnu vrednost
        - '$max' - returnuje maximalnu vrednost
        - '$push' - dodaje vrednost u array
        */
        //Grupiši people prema gradovima u kojima žive i za svaki grad prikaži koliko ljudi u njemu živi
        // {$group: {_id:"$location.city", totalPersons: {$sum:1}} }
        //Da bismo razumeli šta znače ti nazivi gradova koje dobijamo u rezultatu za _id možemo umesto stringa koristiti objekat:
        { $group: {_id:{city: "$location.city"}, totalPersons:{$sum:1}} },
        //Nakon match i group stage-a možemo sortirati dati output, tj. možemo se metodom sort nadovezati na dati rezultat, od prethodna dva stage-a.
        //Za $sort navodimo naziv polja na osnovu kog želimo da izvršimo sortiranje, i vrednost za redosled: 1 (asc), -1 (desc)
        { $sort: {totalPersons:-1}}
    ]) 

    console.log("peoples",peoples)
}

// getPerson()
// Projekcija projektuje šta da se prikaže od polja kao rezultat {nazivPolja: 0 - ne prikazuje se, nazivPolja:1 - prikazuje se}
// Sem toga možemo i doslovno dodati vrednost na primer - ovde funkcija $concat konkatuje dva stringa,
    // što je hardkodovana vrednost, ali možemo takođe koristiti i vrednosti polja tako što koristimo $ znak.

// People.aggregate([
    
//     {$project: {_id:0, gender:1}},
    
//     {$project: {_id: 0, gender:1, fullName: {$concat: ["Hello","World"]} }},
    
//     {$project: {_id: 0, gender:1, fullName: {$concat: ["$name.first"," ","$name.last"] }}},
    
//     {$project: {
//             _id: 0, 
//             gender:1, 
//             fullName: {$concat: [
//                                 {$toUpper: {$substrCP:['$name.first',0,1]}},
//                                 {$substrCP:['$name.first',1, {$subtract: [{$strLenCP:"name.first"},1] }]},
//                                 " ",
//                                 {$toUpper: {$substrCP: ['$name.last',0,1]} },
//                                 {$substrCP: ['$name.last',1, {$subtract: [{$strLenCP:"name.last"},1] }]}
//                             ]
//                         }
//             }
//     },

//     {$project: {_id:0, date: "$dob.date", age: "$dob.age" }}

// ]).then( res => console.log(res))

    

//Zadaci 
/*
Prikaži polje birthYear koje sadrži sve godine rođenja
Sortiraj sve godine po asc orderu
grupiši sva dokumenta u kolekciji po godini rođenja
*/

const getPeople = async() => {
    try{
        /*
        Prikaži polje birthYear koje sadrži sve godine rođenja
        Sortiraj sve godine po asc orderu
        grupiši sva dokumenta u kolekciji po godini rođenja
        */
        /*
        const people = await People.aggregate([
            {$project: {
                birthYear: {$year: {$dateFromString: {dateString: "$dob.date" }}}}
            },
            {$group: {_id:"$birthYear", totalPeople:{$sum:1}}},
            {$sort: {totalPeople:-1}},
        ])
      
 
        /*
        Zadatak:
        Izfiltriraj sve ljude koji su stariji od 45 godina, prikaži samo imena i godine

        Za ovaj zadatak nam je potrebno prvo da vrednost $dob.date pretvorimo u godinu rođenja
        Dakle moramo dodati novo polje (birthYear). Za dodavanje novog polja koristimo operator $addFields.
        $addFields: {
            //Prvo moramo pretvoriti string u date formu (koristimo operator $dateFromString), a potom odatle izvući godinu (koristimo operator $year)
            birthYear: {$year: {$dateFromString: {dateString: "$dob.date"}}}
            //Zatim treba nam trenutna godina - dodajemo polje curent year
            currentYear: {$year: "$$NOW"}
            //Sada možemo izračunati koliko ko ima godina (razlika ($subtract operator) između $currentYear i $birthYear). To će nam biti novo polje age, ali njega moramo dodati u novom $addFields stage-u, kako bi mogli da koristimo novoizračunate vrednosti iz prethodnog.
            age: { $subtract: ["$currentYear", "$birthYear"]}
        } 
        */

        const people = await People.aggregate([
            {
                $addFields: {
                    birthYear: {$year: {$dateFromString: {dateString: "$dob.date"}}},
                    currentYear: {$year: "$$NOW"}
                }
            },
            {
                $addFields: {
                    age: {$subtract: ["$currentYear","$birthYear"]}
                }
            },
            {
                $match: {age: {$gte:40}}
            },
            {
                $project: {
                    _id:0, name: "$name.first", age:1
                }
            }
        ])

        console.log("people",people)

    }catch(error){
        console.log(error)
    }
}

// getPeople();

