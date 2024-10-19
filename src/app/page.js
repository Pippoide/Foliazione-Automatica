'use client'
import { useEffect, useState } from "react";

export default function Home() {

  const formats = [
    { label: '100x70 cm (98x67)', width: 98, height: 67 }, //rimozione dei margini esterni
    { label: '88x64 cm (86x61)', width: 86, height: 61 },
    { label: '70x100 cm (67x98)', width: 67, height: 98 },
    { label: '64x88 cm (61x86)', width: 61, height: 86 }

  ];

  const [selectedFormat, setSelectedFormat] = useState('');
  const [formatWidth, setFormatWidth] = useState(0);
  const [formatHeight, setFormatHeight] = useState(0);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [restoFoglioWidth, setRestoFoglioWidth] = useState(0);
  const [restoFoglioHeight, setRestoFoglioHeight] = useState(0);
  const [doubleface, setDoubleFace] = useState(false);
  const marginPage = 0.5;

  const [columnDefinitive, setColumnDefinitive] = useState(0);
  const [rowDefinitive, setRowDefinitive] = useState(0);

  const handleChangeDoubleFace = (e) => {
    setDoubleFace(e.target.value === 'true')
  }

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
    console.log(e.target.value)
    var dimensioni = formats.find(format => format.label.trim() === e.target.value.trim())
    setFormatWidth(dimensioni.width);
    setFormatHeight(dimensioni.height);
  };

  useEffect(() => {
    console.log("restoFoglioWidth aggiornato:", restoFoglioWidth);
    console.log("restoFoglioWidth aggiornato:", restoFoglioHeight);
    console.log("resto totale in cm2 " + restoFoglioHeight * restoFoglioWidth)
  }, [restoFoglioWidth, restoFoglioHeight]);

  const verifyInput = (size, type) => {
    //type true = width | Type false = height
    if (type) {
      if (size > formatWidth) {
        setWidth(formatWidth)
      }
      else {
        setWidth(size)
      }
    } else {
      if (size > formatHeight) {
        setHeight(formatHeight)
      }
      else {
        setHeight(size)
      }
    }
  }

  const calculate = () => {
    var heightProvvisorio;
    var widthProvvisorio;
    if (doubleface) {
      widthProvvisorio=width*2;
    }
    else{
      widthProvvisorio = width;
    }
    var column = Math.floor(formatWidth / widthProvvisorio)
    do {
      var notHasMargin = true;
      var restoProvvisorioWidth = (formatWidth - (parseFloat(widthProvvisorio) * parseFloat(column)))
      if (restoProvvisorioWidth < (marginPage * (column - 1))) {
        column--;
      }
      else {
        notHasMargin = false
        setRestoFoglioWidth(restoProvvisorioWidth - (marginPage * (column - 1)))
      }
    } while (notHasMargin)

    var row = Math.floor(formatHeight / height)
    do {
      var notHasMargin = true;
      var restoProvvisorioHeight = (formatHeight - (parseFloat(height) * parseFloat(row)))
      if (restoProvvisorioHeight < (marginPage * (row - 1))) {
        row--;
      }
      else {
        notHasMargin = false;
        setRestoFoglioHeight(restoProvvisorioHeight - (marginPage * (row - 1)))
      }
    } while (notHasMargin)
    setRowDefinitive(row)
    setColumnDefinitive(column)
  }

  /*
   const cal = (format, pagX, pagY) => {
     const marginAll = 2; // 2cm per altezza e lunghezza del formatto del tipografo da rimuovere per lasciare 1cm di bordo ovonque 
     const marginPage = 0.5;
     let newTypeX, newTypeY; // NewTypeX/Y = lunghezza/altezza del formatto del tipografo provissorio, le effettive variabili sono typeX/Y
 
     // Rimozione margine base 1cm a tutti è salvataggio delle dimensioni effettive nelle variabili di controllo
     setTypeX(prevTypeX => newTypeX - marginAll);
     setTypeY(prevTypeY => newTypeY - marginAll);
 
     //controllo del lato più lungo per rimuovere un ulterio centimetro per avere un lato da 2cm [1,1,1,2]
     if (typeX > typeY) {
       setTypeX(prevTypeX => prevTypeX - 1)
     }
     else {
       setTypeY(prevTypeY => prevTypeY - 1)
     }
     //------------------Calcolo Colonne e Margine
     // Si lavora considerando margini e tutto su solo una riga e una colonna per poi fare 
     // una moltpiblicazione base x altezza per ottenere il totale
     //
 
     var col = Math.floor(typeX / pagX)
     do {
       var checkMargin = false
       const restoCol = typeX % pagX //calcolo del resto
       alert(restoCol)
       if (col == 1) {
 
       }
       else {
         if (restoCol > (marginPage * (col - 1))) {
           setScartoX(restoCol - (marginPage * (col - 1)))
         }
         else {
           alert("errore")
         }
       }
 
 
 
     } while (false)
 
     // Calcolo quante colonne sono presenti nel folgio
    
     var resCol = Math.floor(newTypeX / pagX); 
     do{
       var check = false
       const restoCol = newTypeX % pagX; // senza considerare i margini fra le pagine si vede quante volte entrano le pagine in orrizontale, quindi le colonne
       console.log(resCol,"resto:" + restoCol, "\n margine tra le pagine : " + marginPage*(resCol-1))
       setScartoX(restoCol-(marginPage*(resCol-1))) // per calcolare lo scarto orrizonatle, facciamo il resto senza margine - (0,5cm * il numero delle colonne che entrano -1) = cosi avremmo lo scarto effettivo, considerano il margine di 0,5 fra le pagine, il -1 è dovuto che l'ultima pagina non ha un margine da rispettare con qualcuno
 
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
     var resRow = Math.floor(newTypeY / pagY); //6
     do{
     var check = false
     var restoRow = newTypeY % pagY; //2cm
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
     **/


  return (
    <main className="w-screen min-h-screen p-12">
      <h1 className="text-xl mb-5">Folianator3000 V0.2</h1>
      <div className="flex flex-col w-min">
        <label>
          <select
            value={selectedFormat}
            onChange={handleFormatChange}
            required
          >
            <option value="">Seleziona un formato</option>
            {formats.map((format, index) => (
              <option key={index} value={format.label}>
                {format.label}
              </option>
            ))}
          </select>
          <label>
            <div>
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={doubleface === true}
                  onChange={handleChangeDoubleFace}
                />
                Pagine unite
              </label>
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={doubleface === false}
                  onChange={handleChangeDoubleFace}
                />
                Pagine singole
              </label>

            </div>
          </label>
        </label>
        <input
          type="number"
          value={width}
          disabled={!selectedFormat}
          placeholder="Inserisci lunghezza"
          onChange={(e) => verifyInput(e.target.value, true)}
        ></input>

        <input
          type="number"
          value={height}
          disabled={!selectedFormat}
          placeholder="Inserisci altezza"
          onChange={(e) => verifyInput(e.target.value, false)}
        ></input>

        {/**Cal (Tipo di formato, Lunghezza X del nostro foglio, Altezza Y del nostro foglio) */}
        <button type="onsubmit" onClick={() => calculate()} className="p-2 bg-red-500"> calcola</button>
        <div>
          {rowDefinitive && columnDefinitive && restoFoglioHeight && restoFoglioWidth && 
            <p>
              Colonne = {columnDefinitive} <br></br>
              Righe = {rowDefinitive}<br></br>
              Pagine = {rowDefinitive*columnDefinitive} <br></br>
              Resto = {restoFoglioHeight*restoFoglioWidth} in cm^2
            </p>
          }
        </div>
      </div>
    </main>
  );

}