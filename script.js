// ********************************************************************************************
// 				External JavaScript - P01 Schweers
// ********************************************************************************************

// FUNCTION THAT PRINTS CALENDAR
function printCalendar() {
	// LOCAL VARS
	var months =  document.getElementById("months").selectedIndex;		// gets requested INDEX of inputted month
	var year = document.getElementById("year").value;			// gets requested year

	var col;								// columns of calendar (7)
	var row;								// rows of calendar (TBD)

	var daysInMonth = 0;							// total days in month
	var firstDay = 0;							// 1st weekday of month
	var monthName;								// holds STRING name of month 
	const weekDays = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];	// array of weekday/weekend names
	var output = ""; 							// used to append HTML

	var k = 0;								// loop counter for nested for loop
	var i = 1;								// ^ 
	var j = 1;								// ^

	// ADJUSTING MONTHS VALUE
	months = (months+1);				// index started @ 0, add 1 (jan index=0 -> jan index=1)

	// GETS DAYS IN GIVEN MONTH
	daysInMonth = getDaysInMonth(months);
	
	// GETS MONTH NAME (string, not index)
	monthName = getMonthName(months);

	// GETS DAY OF 1ST OF GIVEN MONTH
	firstDay = firstDayOfMonth(months, year); 	// result meaning: 1 = sunday, 2 = monday ... 6 = friday, 0 = saturday

	if(firstDay == 0) {				// for looping logic below
		firstDay += 7;
	}

	// PRINTING CALENDAR
	output += "<center>";	
	output += "<h1>" + "&#10032" + " " + monthName + " " + "&#10032" + "</h1>";		// prints selected month name
	output += "<table class = 'calendar'>";

	output += "<tr>";
	for(k = 0; k < 7; k++) {
		output += "<th class = 'th'>" + weekDays[k] + "</th>";				// prints weekday/weekend names
	}
	output += "</tr>";

	for(row = 1; row <= Math.ceil((daysInMonth + firstDay -1)/7); row++) {			// determines amount of rows to print
		output += "<tr>";
		for(col = 1; col <= 7; col++) {
			if(i > daysInMonth) {							// determines how many blank spaces needed after end of month reached
				output += "<td class='td'>" + " " + "</td>";
				i++;
			} else if(j < firstDay) {						// determines how many blank spcaes needed before first of month reached
				output += "<td class = 'td'>" + " " + "</td>";
				j++;
			} else {								// rest of inner calendar data gets printed
				output += "<td class = 'td'>" + i + "</td>";
				i++;
			}
		}
		output += "</tr>";
	}
	output += "</table>";
	output += "</center>";
	document.getElementById("calendar").innerHTML = output;					// prints calendar to page
	return false;										// stops page from becoming rewritten			
}

// FUNCTION TO RETURN BOOLEAN INDICATING IF LEAP YEAR 
function isLeapYear(year) {
	if(((year%4) == 0) && ((year%100) != 0) || ((year%400)==0)) {
		return(true);
	} else {
		return(false);
	}
}

// FUNCTION TO RETURN FIRST DAY OF MONTH 
function firstDayOfMonth(months, year) {
	// ZELLER'S CONGRUENCE
	if (months == 1) {
    		months = 13;
    		year--;  
	} else if (months == 2) {
    		months = 14;
    		year--;  
	}
	// march = 3, april = 4 ... january = 13, february = 14

	return (1 + Math.floor(((13*(months+1)) / 5)) + year%100 + Math.floor(((year%100)/4)) + Math.floor((year/100)/4) + 5*Math.floor((year/100))) % 7;
}

// FUNCTION TO RETURN MONTH NAME
function getMonthName(months) {
	const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return(monthName[months-1]);	// months-1 to account for index (added +1 to months earlier)
}

// FUNCTION TO SET NUM OF DAYS IN GIVEN MONTH
function getDaysInMonth(months) {
	if(months==1 || months==3 || months==5 || months==7 || months==8 || months==10 || months==12){
		return 31;
	} else if(months==4 || months==6 || months==9 || months==11) {
		return 30;
	} else if(months==2){		// special case: february (leap year)
		if(isLeapYear(year)){
			return 29;
		} else {
			return 28;
		}
	}
}