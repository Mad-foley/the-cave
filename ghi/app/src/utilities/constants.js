
export const baseUrl = process.env.REACT_APP_WINES_API_HOST //localhost:8000
export const wsUrl = process.env.REACT_APP_WS_HOST //ws:127.0.0.1:8000
export const logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/WINE-Logo.svg/1200px-WINE-Logo.svg.png'

export const rightArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                          </svg>

export const leftArrow =  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                          </svg>



export const quotes = [
      {
        quote:'“Life is too short to drink bad wine.”',
        author:'Anonymous'
      },
      {
        quote: '“My only regret in life is that I didn’t drink more wine.”',
        author: 'Ernest Hemingway'
      },
      {
        quote: '“I cook with wine. Sometimes I even add it to the food.”',
        author: 'W.C. Fields'
      },
      {
        quote: '“Champagne is appropriate for breakfast, lunch, or dinner.”',
        author: 'Madeline Puckette'
      },
      {
        quote: '“Too much of anything is bad, but too much Champagne is just right.”',
        author: 'F. Scott Fitzgerald'
      },
      {
        quote: '“Drinking good wine with good food in good company is one of lifes most civilized pleasures.”',
        author: 'Michael Broadbent'
      }
  ]
