import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const tagList = [
  "健康",
  "商業與財經",
  "娛樂與音樂",
  "家居與園藝",
  "家庭與人際關係",
  "寵物",
  "懷孕與育兒",
  "政治與政府",
  "教育與參考",
  "新聞與活動",
  "旅遊",
  "汽車與交通",
  "消費電子產品",
  "環境",
  "社會科學",
  "社會與文化",
  "科學",
  "美容與造型",
  "藝術與人文",
  "遊戲與休閒活動",
  "運動",
  "電腦與網際網路",
  "食品與飲料",
  "餐廳與小吃",
  "花雄",
];

const useStyles = makeStyles((theme) => ({
  tag: {
    marginTop: theme.spacing(1.5),
    cursor: "pointer",
  },
}));

const TagList = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h2" color="initial">
        Catagories
      </Typography>
      {tagList.map((tag) => (
        <Typography
          className={classes.tag}
          variant="body2"
          color="textSecondary"
        >
          {tag}
        </Typography>
      ))}
    </div>
  );
};

export default TagList;
