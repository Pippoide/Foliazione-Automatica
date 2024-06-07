'use client'
import { useEffect, useState } from "react";

export default function Home() {
  const [typeX, setTypeX] = useState(0);
  const [typeY, setTypeY] = useState(0);
  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);
  const [scartoX, setScartoX] = useState(0);
  const [scartoY, setScartoY] = useState(0)

  const cal = (type, risX, risY) => {
    const marginAll = 2; // 2cm perchè è tutta l'asse X e Y
    const marginPage = 0.5;
    let newTypeX, newTypeY;

    switch (type) {
      case 1:
        newTypeX = 100;
        newTypeY = 110;
        break;
      case 2:
        newTypeX = 100;
        newTypeY = 100;
        break;
      case 3:
        newTypeX = 100;
        newTypeY = 70;
        break;
      default:
        return;
    }

    // Rimozione margine base 1cm a tutti
    newTypeX -= marginAll;
    newTypeY -= marginAll;

    // Imposta i nuovi valori dello stato
    setTypeX(newTypeX);
    setTypeY(newTypeY);

    // Calcolo delle colonne Asse X
    var resCol = Math.floor(newTypeX / risX);
    do{
    var check = false
    const restoCol = newTypeX % risX;
    console.log(resCol,"resto:" + restoCol, "\n margine tra le pagine : " + marginPage*(resCol-1))
    setScartoX(restoCol-(marginPage*(resCol-1)))

    if (restoCol >= (marginPage*(resCol-1))){
      console.log("c'entra con il margine");
      setCol(resCol);
      check = true;
    }else{
      console.log("non c'entra con il margine da 0.5")
      resCol--;
      console.log("è stata rimmosa una colonna")
      return 0;
    }
  }while(!check );

    // Calcolo delle righe Asse Y
    var resRow = Math.floor(newTypeY / risY); //6
    do{
    var check = false
    var restoRow = newTypeY % risY; //2cm
    console.log(resRow,"resto:" + restoRow, "\n margine tra le pagine : " + marginPage*(resRow-1)) //2.5
    setScartoY(restoRow-(marginPage*(resRow-1))) //-0,5

    if (restoRow >= (marginPage*(resRow-1))){
      console.log("c'entra con il margine");
      setRow(resRow)
      check = true;
    }else{
      console.log("non c'entra con il margine da 0.5")
      resRow--
      console.log("è stata rimmosa una riga")
    }
    
    }while(!check );


    const marginHand = 1;
    // Dopo che lo stato è stato effettivamente aggiornato, esegui checkIndicatore
    if(scartoX > 1 || scartoY > 1){
      console.log("errore manca margine finale per il braccio")
    }
    else{
      if(typeX>typeY){
        setTypeX(x=>x-marginHand)
      }
      else{
        setTypeY(x=>x-marginHand)
      }
    }
    return 0;

  };

  
 


  return (
    <main className="w-screen min-h-screen p-24">
      <h1 className="text-3xl mb-5">Foliazione V.0.1</h1>
      <p>asse X: {typeX} asse Y: {typeY}</p><br></br>
      <p>colonne : {col} righe : {row}</p><br></br>
      <p>scarto X : {scartoX } scarto Y: {scartoY} Area di Scarto : {scartoX*scartoY}cm^2</p><br></br>
      <p>pagine totali : {col*row}</p><br></br>
      <button onClick={() => cal(1, 47, 16)} className="p-2 bg-red-500"> calcola</button>
    </main>
  );
}
