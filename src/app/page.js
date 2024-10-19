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
    if (e.target.value) {
      var dimensioni = formats.find(format => format.label.trim() === e.target.value.trim())
      setFormatWidth(dimensioni.width);
      setFormatHeight(dimensioni.height);
    }

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
      widthProvvisorio = width * 2;
    }
    else {
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

  return (
    <div className="w-screen min-h-screen h-full p-12 md:p-24 flex flex-col justify-start items-start bg-white">
      <main className="  flex flex-col">

        <h1 className="text-3xl mb-5 text-black">Folianator3000 V0.2</h1>
        <div className="flex flex-col w-full space-y-5">

          {/** label selection format */}
          <label className="w-full flex flex-col">
            <p className="text-black"><b>Seleziona prima il formato</b>, accanto vedi le dimensioni massime con i margini gia tolti</p>
            <select
              className="w-full bg-[#f8f8f8] text-black p-2 rounded-sm"
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
          </label>

          {/** label radio */}
          <label className="w-full flex flex-col">
            <p className="text-black">Seleziona il tipo di foliazione</p>
            <div className="flex space-x-3">
              <label className="space-x-1">
                <input
                  type="radio"
                  value="true"
                  checked={doubleface === true}
                  onChange={handleChangeDoubleFace}
                />
                <span className="text-black">Pagine unite</span>
              </label>
              <label className="space-x-1">
                <input
                  type="radio"
                  value="false"
                  checked={doubleface === false}
                  onChange={handleChangeDoubleFace}
                />
                <span className="text-black">Pagine singole</span>
              </label>
            </div>
          </label>

          {/**Label input */}
          <label className="flex flex-col">
            <p className="text-black">Inserisci le dimensioni <b>della pagina singola in centimetri</b> </p>
            <div className="flex flex-col space-y-2">
              <input
                className="p-2 bg-[#f8f8f8]"
                type="number"
                value={width}
                disabled={!selectedFormat}
                placeholder="Inserisci la larghezza"
                onChange={(e) => verifyInput(e.target.value, true)}
              ></input>
              <input
                className="p-2 bg-[#f8f8f8]"
                type="number"
                value={height}
                disabled={!selectedFormat}
                placeholder="Inserisci l'altezza"
                onChange={(e) => verifyInput(e.target.value, false)}
              ></input>
            </div>

          </label>

          {/**Cal (Tipo di formato, Lunghezza X del nostro foglio, Altezza Y del nostro foglio) */}
          <button type="onsubmit" onClick={() => calculate()} className="p-2 bg-red-500 text-white"> calcola</button>
          <div>
            {rowDefinitive && columnDefinitive && restoFoglioHeight && restoFoglioWidth &&
              <p className="text-black">
                Colonne = {columnDefinitive} <br></br>
                Righe = {rowDefinitive}<br></br>
                Pagine = {rowDefinitive * columnDefinitive} <br></br>
                Resto = {restoFoglioHeight * restoFoglioWidth} in cm^2
              </p>
            }
          </div>
        </div>
      </main >
    </div>


  );

}