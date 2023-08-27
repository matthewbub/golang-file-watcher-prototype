package helpers

import (
	"time"
)

// PrintCurrentMonthYear prints the current date in "mm-yy" format
func FormatTimeStamp() string {
	currentTime := time.Now()
	formattedTime := currentTime.Format("01-06") // 01 for zero-padded month, 06 for zero-padded year

	return formattedTime
}
