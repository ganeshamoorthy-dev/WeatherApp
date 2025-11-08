import { Box, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { LocationSearchResponseModel } from "../../model/locationSearchResponseModel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { WeatherLocationSearchFieldModel } from "./WeatherLocationSearchFieldModel";
import Flag from "react-world-flags";
import { countries } from "./CountryCode";
import styled from "styled-components";

const StyledAutoCompleteOptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 8px 0;
  white-space: nowrap;
  overflow: hidden;

  & .location-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.95rem;
    color: #1e293b;
  }

  & img {
    width: 32px;
    height: 24px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;

    @media (max-width: 576px) {
      width: 28px;
      height: 20px;
    }
  }
`;

function WeatherLocationSearchField(props: WeatherLocationSearchFieldModel) {
  const [searchKey, setSearchKey] = useState("");
  const [options, setOptions] = useState<LocationSearchResponseModel[]>([]);
  const [loading, setLoading] = useState(false);
  const { optionsResolver, onChange } = props;

  const countryMap = useMemo(() => new Map(countries.map(({ name, code }) => [name, code])), []);

  const onSearchKeyChange = useCallback(
    async function () {
      setLoading(true);
      const options = await optionsResolver(searchKey);
      setLoading(false);
      setOptions(options);
    },
    [optionsResolver, searchKey]
  );

  useEffect(() => {
    onSearchKeyChange();
  }, [onSearchKeyChange]);

  function getCountryCodeFromName(country: string) {
    return countryMap.get(country);
  }

  return (
    <>
      <Autocomplete
        size="small"
        sx={{
          backgroundColor: "#fff",
          borderRadius: '8px'
        }}
        disableClearable
        filterOptions={(options) => options}
        disablePortal
        options={options}
        loading={loading}
        getOptionLabel={(option) => `${option.name}, ${option.country}`}
        onChange={(_, value) => onChange(value as LocationSearchResponseModel)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for a city... (e.g., London, Tokyo, New York)"
            onChange={(event) => {
              setSearchKey(event.target.value);
            }}
            InputLabelProps={{ shrink: false }}
          />
        )}
        renderOption={(props, option: LocationSearchResponseModel) => {
          const { key, ...optionProps } = props;
          return (
            <Box component="li" key={key} {...optionProps}>
              <StyledAutoCompleteOptionContainer>
                <span className="location-text">
                  {option.name} | {option.region} | {option.country}
                </span>
                <Flag code={getCountryCodeFromName(option.country)} />
              </StyledAutoCompleteOptionContainer>
            </Box>
          );
        }}
      />
    </>
  );
}

export default WeatherLocationSearchField;
