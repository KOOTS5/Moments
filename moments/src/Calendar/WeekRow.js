import DayBox from './DayBox.js'
/*
    One row in a calendar
    props:
        label: Array of labels to go into a WeekRow, sequentially added to week 
        
*/
function WeekRow(props) {
    // const array = Array(7).fill(NaN); // range to get 7 numbers
    const row = props.days.map((day) =>
        <DayBox
            label={day["label"]}
            dayHandler={() =>
                props.dayHandler(day["label"])
            }
            events={day["events"]}
            key={day["key"]}
        />
    );
    return (
        <tr>
            {row}
        </tr>
    );
}

export default WeekRow;