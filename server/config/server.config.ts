interface Server {
  start: () => void;
}

const server = async ({ app }) => {

  app.get('/_health', (req, res) => {
    res.send('OK');
  });

  const start = () => {
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  };

  return {
    start,
  };
}

export default server;

