import './train.css'
import Header from '../header'
import Footer from '../footer'
import { GiSettingsKnobs } from "react-icons/gi";
import TrainItem from '../trainItem';
import HorizontalDatePicker from '../calender';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../loader';

import { useTrainsList } from '../../hook/useTrainList';
import { useSourceHome } from "../../hook/useHome";
import { useDebounce } from "../../hook/useDebounce";

const statusOfTrains = {
  empty: "empty",
  pending: "pending",
  success: "success"
}

const TrainList = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // INPUT STATES
  const [sourcePlace, setSourcePlace] = useState('');
  const [destinationPlace, setDestinationPlace] = useState('');

  // DEBOUNCED VALUES
  const debouncedSourcePlace = useDebounce(sourcePlace, 500);
  const debouncedDestinationPlace = useDebounce(destinationPlace, 500);

  // SELECTED STATION CODE
  const [sourceCode, setSourceCode] = useState('');
  const [destinationCode, setDestinationCode] = useState('');

  const [sourceSelected, setSourceSelected] = useState(false);
  const [destinationSelected, setDestinationSelected] = useState(false);

  const [status, setStatus] = useState(statusOfTrains.empty);

  // FETCH TRAINS
  const { data, isLoading } = useTrainsList(
    sourceCode,
    destinationCode
  );

  console.log(data)

  // FETCH SOURCE SUGGESTIONS (DEBOUNCED)
  const {
    data: sourceData,
    isLoading: sourceLoading
  } = useSourceHome(debouncedSourcePlace);

  // FETCH DESTINATION SUGGESTIONS (DEBOUNCED)
  const {
    data: destinationData,
    isLoading: destinationLoading
  } = useSourceHome(debouncedDestinationPlace);


  // STATUS CONTROL
  useEffect(() => {
    if (isLoading) {
      setStatus(statusOfTrains.pending);
    }
    else if (!data || data.length === 0) {
      setStatus(statusOfTrains.empty);
    }
    else {
      setStatus(statusOfTrains.success);
    }
  }, [data, isLoading]);


  // GET PARAMS FROM URL
  useEffect(() => {

    const from = searchParams.get('from') || '';
    const to = searchParams.get('to') || '';

    setSourceCode(from);
    setDestinationCode(to);

    setSourcePlace(from);
    setDestinationPlace(to);

  }, [searchParams]);


  // INPUT HANDLERS
  const onSourceChange = (e) => {
    setSourcePlace(e.target.value);
    setSourceSelected(true);
  };

  const onDestinationChange = (e) => {
    setDestinationPlace(e.target.value);
    setDestinationSelected(true);
  };


  // FORM SUBMIT
  const onFormSubmit = (e) => {

    e.preventDefault();

    if (!sourceCode || !destinationCode) return;

    setStatus(statusOfTrains.pending);

    navigate(`?from=${sourceCode}&to=${destinationCode}`);
  };


  // RENDER METHODS
  const renderEmpty = () => (
    <div className='loader-container'>
      <p>No Trains Listed</p>
    </div>
  );

  const renderLoader = () => (
    <div className='loader-container'>
      <LoadingSpinner />
    </div>
  );

  const renderTrains = () => (
    <ul className='ul-trains-list'>
      {data?.map(train => (
        <TrainItem key={train.trainNo} trainDetails={train} />
      ))}
    </ul>
  );

  const renderStatus = () => {
    switch (status) {
      case statusOfTrains.empty:
        return renderEmpty();
      case statusOfTrains.pending:
        return renderLoader();
      default:
        return renderTrains();
    }
  };


  return (
    <div className='top-container' >
      <Header />
      <div className='train-container ' >
        <div className='side-container'>
          <h1 className='head'>Your Search Results</h1>
          <div className='container-height' >
            <form onSubmit={onFormSubmit} className='search-container'>
              <div className='input-container-ee'>
                <input type='text' value={sourcePlace} onBlur={() => setSourceSelected(false)} onChange={onSourceChange} className='input' placeholder='source' />
                <hr />
                {sourceSelected &&
                  (!sourceLoading ? (<ul className="ul-stations-book" >
                    {sourceData?.map(eachStations => (
                      <li key={eachStations.id} className="list-stations-book"
                        onMouseDown={() => {
                          setSourceCode(eachStations.code),
                            setSourcePlace(eachStations.name)
                          setSourceSelected(false);
                         
                        }}


                      >
                        <p className="stations-p" >{eachStations.code}</p>
                        <p className="stations-p-p"   >{eachStations.name}</p>

                      </li>
                    ))}

                  </ul>) : (<div className="class-loader">

                    <p>Loading....</p>
                  </div>))}

              </div>
              <div className='input-container-ee'>
                <input className='input' value={destinationPlace} onChange={onDestinationChange} onBlur={() => setDestinationSelected(false)} placeholder='destination' type='text' />
                <hr />
                {destinationSelected &&
                  (!destinationLoading ? <ul className="ul-stations-book">
                    {destinationData?.map(eachStations => (
                      <li key={eachStations.id} className="list-stations" onMouseDown={() => {
                        setDestinationCode(eachStations.code)
                        setDestinationPlace(eachStations.name)
                        setDestinationSelected(false)
                        
                      }}  >
                        <p className="stations-p" >{eachStations.code}</p>
                        <p className="stations-p"   >{eachStations.name}</p>

                      </li>
                    ))}

                  </ul> : (<div className="class-loader">

                    <p>Loading....</p>
                  </div>))}
              </div>
              <button type='submit' className='trains-btn' >Search for trains</button>
            </form>

            <HorizontalDatePicker />

            <div className='container-height1'>
              <div className='container-height2'>
                <div className='plan-container'>
                  <p className='name-plan-01'>Planning your holidays</p>

                </div>
                <div className='tour-container'>
                  <p className='name-plan-01'>Train tourism packages</p>

                </div>
              </div>
              <p className='last-para-home'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et olore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et olore magna aliqua</p>
            </div>

          </div>

        </div>
        <div className='side-container2'>
          <div className='available-trains'>
            <div className='trains-available'>
              <h2 className='train-h1'>Available Trains</h2>
              <p className='p-train'>{data?.length} Trains Available </p>

            </div>
            <GiSettingsKnobs color='#0578ff' size={20} />

          </div>
          <hr className='hr' />
        
          {renderStatus()}
        </div>

      </div>
      <Footer />
    </div>
  )

}

export default TrainList