import { Input, Stack } from "@chakra-ui/react";
import { __ } from "@wordpress/i18n";
import React, { useState, useEffect } from "react";
import { useDebounce } from "./../../../hooks/index";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, RangeKeyDict } from "react-date-range";

// Define the type for the date range
interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface SnippetFilterProps {
  params: Record<string, any>; // Adjusted to a more general type, you can refine it based on actual params structure
  setParams: (params: Record<string, any>) => void;
}

const SnippetFilter: React.FC<SnippetFilterProps> = ({ params, setParams }) => {
  const [searchByItem, setSearchByItem] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  });
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);

  const searchByItemValue = useDebounce<string>(searchByItem, 500);

  const handleSelect = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    setDateRange({
      startDate: selection.startDate,
      endDate: selection.endDate,
      key: selection.key
    });
    setParams({
      ...params,
      startDate: selection.startDate,
      endDate: selection.endDate
    });
    setIsPickerVisible(false);
  };

  useEffect(() => {
    if (searchByItemValue) {
      setParams((prevParams) => ({
        ...prevParams,
        searchByItem: searchByItemValue
      }));
    }
  }, [searchByItemValue, setParams]);

  return (
    <Stack direction="row" gap="16px">
      <Input
        border="1px solid gray.100"
        type="text"
        w="300px"
        value={searchByItem}
        placeholder={__("Search by items", "easy-mail-smtp")}
        onChange={(e) => setSearchByItem(e.target.value)}
      />
      <Input
        border="1px solid gray.100"
        type="text"
        w="300px"
        value={`${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`}
        placeholder={__("Select date range", "easy-mail-smtp")}
        readOnly
        onClick={() => setIsPickerVisible(true)}
      />
      {isPickerVisible && (
        <DateRangePicker
          ranges={[dateRange]}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          editableDateInputs={true}
          onCalendarClose={() => setIsPickerVisible(false)}
        />
      )}
    </Stack>
  );
};

export default SnippetFilter;
