export const formatDate = (dateString: string): string => {
    const [datePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');

    const date = new Date(Number(year), Number(month) - 1, Number(day));

    const weekDayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const weekDay = weekDayNames[date.getDay()];

    // 월과 일을 2자리로 패딩 (예: "01", "05")
    const paddedMonth = String(month).padStart(2, '0');
    const paddedDay = String(day).padStart(2, '0');

    return `${year}.${paddedMonth}.${paddedDay}(${weekDay})`;
};
