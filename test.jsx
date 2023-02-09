<Box w="75%" float={"left"}>
  <Text p="2" rounded={"md"} bgColor={"gray.200"}>
    Hi, how are you Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    Nisi, enim facere! Labore .
  </Text>
</Box>;
const messRef = useRef();
const { currentGroup } = useSelector((state) => state.MESSAGE);
const [message, setMessage] = useState([]);

useEffect(() => {
  messRef.current && window.scrollTo(0, messRef.current.offsetHeight);
  const unsub = () => {
    onSnapshot(doc(db, "chats", currentGroup[0]), (doc) => {
      setMessage(doc.data().message);
    });
    return () => {
      unsub();
    };
  };
  currentGroup && unsub();
}, [currentGroup && currentGroup[0]]);
console.log(message);
