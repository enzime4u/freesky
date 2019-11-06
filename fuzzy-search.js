import FuzzySearch from "fuzzy-search";

const [search, setSearch] = useSearch("");
const [results, setResults] = useState(pilots); // all results at first

const searcher = new FuzzySearch(pilots, ["name", "city"]);

function onSearch(search) {
  const result = searcher.search(search);

  setSearch(search);
  setResults(result);
}

return (
  <View>
    <input
      type="text"
      onChange={e => onSearch(e.target.value)}
      value={search}
    />

    <Results />
  </View>
);
