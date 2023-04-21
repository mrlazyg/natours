exports.health = (req, res) => {
  try {
    // res.cookie(
    //   'access_token',
    //   'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTYyOTM4NjEyOSwiZXhwIjoxNjI5Mzg5NzI5fQ',
    //   { maxAge: 30000 }
    // );
    res.status(200).send({
      app_name: process.env.npm_package_name || 'natours-api',
      app_version: process.env.npm_package_version,
      description: 'app is up and running',
      uptime: process.uptime(),
      platform: process.platform,
      memory_usage: process.memoryUsage(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};
