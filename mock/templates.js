import Mock from 'mockjs';

const data = Mock.mock({
    data: {
    "template_id": 8996290,
    "template_name": "Generation test",
    "variables": [
        {
            "id": 1234,
            "name": "duedate",
            "label": "Due date",
            "type": "date",
            "min_value": 1496275200,
            "max_value": 1527811200
        },
        {
            "id": 1235,
            "name": "creationdate",
            "label": "Creation date",
            "type": "date"
        },
        {
            "id": 1236,
            "name": "amount",
            "label": "Amount",
            "type": "number",
            "min_value": 0
        },
        {
            "id": 1237,
            "name": "name",
            "label": "Name",
            "type": "text"
        }
    ]
}});
module.exports = {
    ['GET /api/templates'](req, res) {
  console.log(666)
      setTimeout(() => {
        res.status(200).json(data);
        console.log(res)
        return res
      }, 200);
    },
}