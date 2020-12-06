import { createUseStyles } from "react-jss"



export type classesType<A = string> = {
    TimePicker:A,
    TimePickerAnalogDisplay:A,
    TimePickerSvgCircle:A,
    TimePickerDial:A,
    TimePickerDialHours:A,
    TimePickerDialMinutes:A,
    TimePickerSvgDiv:A,
    TimePickerPlate:A,
    TimePickerContent:A,
    TimePickerOverlay:A,
    TimePickerDisplayAmPm24:A,
    TimePickerSpanMinutes:A,
    TimePickerSpanHours:A,
    TimePickerTextContainer:A,
    TimePickerDigitalDisplay:A,
    TimePickerTick:A,
 
}

const useStyles = createUseStyles({
    "@global": {
        'svg:not(:root)': {
            overflow:'hidden'
        }
        
    },
    TimePicker:{
        position: 'fixed',
        opacity: '1',
        left: '0',
        right: '0',
        
        maxWidth: '325px',
        
        backgroundColor: '#fafafa',
        padding: '0',
        margin: 'auto',
        overflowY: 'auto',
        borderRadius: '2px',
        willChange: 'top, opacity',
        transform: "scaleX(1) scaleY(1)",
        '@media only screen and (max-width: 992px)': {
            width:'80%',
            maxHeight:'none',
        },
        '@media only screen and (min-width: 601px)': {  
            maxWidth:'600px',
            maxHeight:'none',
        }
    },

    
    TimePickerOverlay:{
        position: 'fixed',
        zIndex: '999',
        top: '-25%',
        left: '0',
        bottom: '0',
        right: '0',
        height: '125%',
        width: '100%',
        background: '#000',
        opacity: '0.5',
        display: 'none',
        willChange: 'opacity',
    },

    
    TimePickerContent:{

        display:'flex',
        //@ts-ignore
        fallbacks:[{display:'-webkit-box'},{display:'-webkit-flex'},{display:'-ms-flexbox'}], 
        padding:'0',
        '-webkit-box-orient':'vertical',
        '-webkit-box-direction':'normal',
        '-webkit-flex-direction':'column',
        '-ms-flex-direction':'column',
        'flex-direction':'column',
        
        '@media only screen and (min-width: 992px)': {
            '-webkit-box-orient':'horizontal',
            '-webkit-box-direction':'normal'
        },
        '@media (max-width: 1100px) and (min-width: 600px)': {
            '-webkit-box-orient':'horizontal',
            '-webkit-box-direction':'normal'
        },
    },
    TimePickerPlate:{
        backgroundColor: '#eee',
        borderRadius: '50%',
        width: '270px',
        height: '270px',
        overflow: 'visible',
        position: 'relative',
        margin: 'auto',
        //marginTop: 'auto',
        //marginBottom: 'auto',
        marginTop: '25px',
        marginBottom: '5px',
        '-webkit-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        userSelect: 'none',
    },
    TimePickerSvgDiv :{
        '-webkit-transition': 'opacity 175ms',
        transition: 'opacity 175ms',
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        '& line': {
            'stroke': '#26a69a',
            'stroke-width': '4',
            'stroke-linecap': 'round',
        }
    },
    TimePickerDialMinutes:{
        '&.TimepickerDialOut':{
            '-webkit-transform' : 'scale(0.8, 0.8)',
            transform: 'scale(0.8, 0.8)'
        }
    },

     
    TimePickerDialHours:{
        '&.TimepickerDialOut':{
            '-webkit-transform': 'scale(1.1, 1.1)',
            transform: 'scale(1.1, 1.1)'
        }
    },
    TimePickerDial:{
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
    
        '-webkit-transition': 'opacity 350ms, -webkit-transform 350ms',
        transition: 'opacity 350ms, -webkit-transform 350ms',

        //@ts-ignore
        fallbacks:[{transition: 'transform 350ms, opacity 350ms'},{transition: 'transform 350ms, opacity 350ms, -webkit-transform 350ms'}],
        

        
    },
    
    TimePickerSvgCircle:{
        stroke: 'none',
        fill: '#26a69a',
    },
    TimePickerAnalogDisplay :{
        '-webkit-box-flex':'2.5',
        '-webkit-flex':'2.5 auto',
        '-ms-flex':'2.5 auto',
        flex:'2.5 auto'
    },
    TimePickerTick:{
        borderRadius: '50%',
        color: 'rgba(0,0,0,0.87)',
        lineHeight: '40px',
        textAlign: 'center',
        width: '40px',
        height: '40px',
        position: 'absolute',
        cursor: 'pointer',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: 'rgba(38,166,154,0.25)',
        }
    },
    TimePickerDigitalDisplay:{
        '-webkit-box-flex':'1',
        '-webkit-flex':'1 auto',
        '-ms-flex':'1 auto',
        flex:'1 auto',
        backgroundColor:'#26a69a',
        padding:'10px',
        fontWeight:'300'
    },
    TimePickerTextContainer:{
        fontSize: '4rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.6)',

        position: 'relative',
        '-webkit-user-select': 'NamedNodeMap',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        userSelect: 'none',
    
        '@media only screen and (min-width: 601px)': {
            top:'32%'
        }
    },
    
    TimePickerSpanHours: {
        //marginLeft: "3px",
        cursor: 'pointer',
    },
    TimePickerSpanMinutes:{
        //marginLeft: "3px",
        cursor: 'pointer',
    },
    TimePickerDisplayAmPm24:{
        fontSize:'1.3rem',
        flex:'1',
        fontWeight:'400',
        display:'flex',
        flexDirection:'row',

        '@media only screen and (min-width: 601px)': {

        
            marginTop:'1.2rem',
        },

        '& div': {
            cursor: 'pointer',
        }
    },
})



export const useTimePickerStyle = () => {

    return useStyles()
}








