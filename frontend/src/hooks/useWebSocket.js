const useCourseUpdates = (courseId) => {
  const [seats, setSeats] = useState(null);
  const { lastMessage } = useWebSocket(`wss://yourdomain.com/ws?course=${courseId}`);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      setSeats(data.available);
    }
  }, [lastMessage]);

  return seats;
};
