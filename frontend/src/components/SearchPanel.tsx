import SuggestionsList from "./SuggestionsList";
import { useState } from "react";
import { searchLocations } from "../services/locationService";

//this is component typescript
type Suggestion = {
  name: string;
  latitude: string;
  longitude: string;
};

function SearchPanel() {
  //creating source and destination state
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  //creating suggestion state
  const [sourceSuggestions, setSourceSuggestions] = useState<Suggestion[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    Suggestion[]
  >([]);

  //handles source change dynamically while typing
  const handleSourceChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setSource(value);
    const results = await searchLocations(value);
    setSourceSuggestions(results);
  };

  //handles destination change dynamically while typing
  const handleDestinationChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setDestination(value);
    const results = await searchLocations(value);
    setDestinationSuggestions(results);
  };

  //selects location from suggestions
  const handleSuggestionSelect = (sourceSuggestions: Suggestion) => {
    setSource(sourceSuggestions.name);
    setSelectedSource(sourceSuggestions);
    setSourceSuggestions([]);
  };

  //selects destination from suggestions
  const handleDestinationSelect = (destinationSuggestions: Suggestion) => {
    setDestination(destinationSuggestions.name);
    setSelectedDestination(destinationSuggestions);
    setDestinationSuggestions([]);
  };

  //creating suggestion selected state
  const [selectedSource, setSelectedSource] = useState<Suggestion | null>(null);

  const [selectedDestination, setSelectedDestination] =
    useState<Suggestion | null>(null);

  //final submit handler
  const handleSubmit = () => {
    console.log("SOURCE:", selectedSource);
    console.log("DESTINATION:", selectedDestination);
  };

  {
    /*here we are taking input for source and destination */
  }
  return (
    <div>
      {/*Input Section*/}
      <div className="mt-10">
        <div className="flex flex-row gap-6">
          <div className="relative w-full">
            <input
              placeholder="Enter Source"
              className="input-box"
              value={source}
              onChange={handleSourceChange}
            />
            <SuggestionsList
              suggestions={sourceSuggestions}
              onSelect={handleSuggestionSelect}
            />
          </div>

          <div className="relative w-full">
            <input
              placeholder="Enter Destination"
              className="input-box"
              value={destination}
              onChange={handleDestinationChange}
            />
            <SuggestionsList
              suggestions={destinationSuggestions}
              onSelect={handleDestinationSelect}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchPanel;
