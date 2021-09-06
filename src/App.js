import { useEffect, useState } from 'react';
import './App.css';
import close from './icon/close.png';
import alertImage from './icon/alert.gif';
import $ from 'jquery';
import moment from 'moment';

function App() {
  
  //Hooks
  const [time , setTime] = useState(Date);
  const [alert , setAlert] = useState(Date);
  const [grabTime , setGrabTime] = useState([]);
  const [colorIs , setColor] = useState([]);
  const [singleColor , setSingleColor] = useState();
  
  useEffect(()=>{
    changeTime();  
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const time = document.querySelector('.times');
    const color = time.style.color = `rgba( ${red}, ${green} , ${blue} , 1)`;
    setSingleColor(color);
  },[time]);


  useEffect(()=>{

    if(alert === time){
      $('.alarm').show(); closeAlarm();
    }
   
  },[time]);


  useEffect(()=>{
    const alertDate = moment(alert,"HH:mm:ss a").format("LTS");
    setAlert(alertDate);
  }, [alert])
  
  
  //Function
  const changeTime = () =>{
    setInterval(()=>{
      const time = new Date().toLocaleTimeString();
      setTime(time);
    }, 1000)   
  }

  const closeAlarm = () => {
    setTimeout(() => {
      $('.alarm').hide();
    }, 5000);
  }
  
  const grabTimeIs = () => {
    setGrabTime([...grabTime , time]);
    setColor([...colorIs , singleColor]);
  }

  const clearTimeIs = () =>{
    setGrabTime([]);
  }

  const closeModal = () => {
    const alertBox = document.querySelector('.alertModalOpen');
    alertBox.style.visibility = "hidden";
  }

  const setAlertModal = () =>{
    const alertBox = document.querySelector('.alertModalOpen');
    alertBox.style.visibility = "visible";
  }

  const callHistory = (element) => {
      const filter = grabTime.filter((historyItem)=>{
        return historyItem <= element;
      })
      setGrabTime(filter);
  }


  return (
    <div className="App">
      <div className="times">{time}</div>
      <div className="inputs">
        <button onClick={grabTimeIs}>Grab Time</button>
        {
          grabTime.length > 0 && (<button onClick={clearTimeIs}>Clear Time</button>)
        }
        
      </div>

      <div className="grabedTime">
          {
            grabTime.map((item , index)=>(
              <div className="grabIs" style={{color : colorIs[index]}} onClick={()=>{callHistory(item)}}>{item}</div>
            ))
          } 
      </div>
      

      {/* Alarm Modal */}

      <div className="alertModalOpen">
          <div className="alertModal">
            <div>{time}</div>
            <input type="time" step="1" onChange={e => setAlert(e.target.value)}/>
            <button onClick={closeModal}>Set Alert</button>
            <div className="close"><img src={close} alt={close} onClick={closeModal} /></div>
          </div>
      </div>
      <div className="setAlert" onClick={setAlertModal}>Set Alarm</div>


      {/* Alert Box */}
          <div className="alarm">
            <img src={alertImage} alt={alertImage}/>
          </div>
      {/* Alert Box End */}
    </div>
  );
}

export default App;
