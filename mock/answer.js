import Mock from 'mockjs';

const data = Mock.mock({
    data: {
    result: true
}});
module.exports = {
    ['POST /api/answer'](req, res) {
        console.log(666)
            setTimeout(() => {
              res.status(200).json(
                  {
                      success: true,
                      result: true
                  }
              );
              console.log(res)
              return res
            }, 200);
          },
}