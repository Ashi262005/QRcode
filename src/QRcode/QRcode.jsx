import {useState} from "react";
export const QRcode = () => {
  const [img,setImg] =useState("")
  const [load,setload] =useState(false)
  const [qrdata,setqrdata] =useState("")
  const [qrsize,setqrsize] =useState("")
  async function generate(){
    setload(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
      setImg(url);
    }catch(error){
      console.error("Error getting QR code")
    }
    finally{
      setload(false);
    }
  }
  async function download(){
   fetch(img)
    .then((response) => response.blob())
    .then((blob) => {
    const link= document.createElement("a");
    link.href= URL.createObjectURL(blob);
    link.download="QRCode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    }).catch((error) => {
      console.error("Error downloading QR code", error);
    });
  }
  return (
    <div className="app-container">
      <h1>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{marginRight: '10px', verticalAlign: 'middle'}}>
          <rect x="3" y="3" width="8" height="8" fill="#2c3e50"/>
          <rect x="13" y="3" width="8" height="8" fill="#2c3e50"/>
          <rect x="3" y="13" width="8" height="8" fill="#2c3e50"/>
          <rect x="5" y="5" width="4" height="4" fill="white"/>
          <rect x="15" y="5" width="4" height="4" fill="white"/>
          <rect x="5" y="15" width="4" height="4" fill="white"/>
          <rect x="13" y="13" width="2" height="2" fill="#2c3e50"/>
          <rect x="17" y="13" width="2" height="2" fill="#2c3e50"/>
          <rect x="13" y="17" width="2" height="2" fill="#2c3e50"/>
          <rect x="17" y="17" width="2" height="2" fill="#2c3e50"/>
          <rect x="15" y="15" width="2" height="2" fill="#2c3e50"/>
        </svg>
        QR Code Generator
      </h1>
      
      {load && <em>Generating QR code...</em>}
      {img && <img src={img} className="img" alt="Generated QR Code" />}
      
      <input 
        type="text" 
        value={qrdata} 
        id="datainput" 
        placeholder="Enter URL or text for QR code" 
        onChange={(e) => setqrdata(e.target.value)}
      />
      
      <input 
        type="text" 
        value={qrsize} 
        id="sizeinput" 
        placeholder="Enter size (e.g., 200)" 
        onChange={(e) => setqrsize(e.target.value)}
      />
      
      <div className="create">
        <button 
          className="Generate" 
          disabled={load || !qrdata || !qrsize} 
          onClick={generate}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          {load ? 'Generating...' : 'Generate QR Code'}
        </button>
        <button 
          className="Download" 
          disabled={!img}
          onClick={download}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          Download QR Code
        </button>
      </div>
      
      <em>Designed by Ashika</em>
    </div>
  )
}

