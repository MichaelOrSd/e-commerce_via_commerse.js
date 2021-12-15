import React from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

// this is our styles from the adjacent files
import useStyles from "./styles";

// Destructs the product form props
const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  // use to test

  // console.log(product);
  // return <div>test</div>;

  return (
    <Card className={classes.root}>
      {/* Had to change the image tags from media to image as commerce.js was updated. */}
      <CardMedia className={classes.media} image={product.image.url} image_dimensions={product.image.dimensions} title={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          {/* Typography is used for any text */}
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">{product.price.formatted_with_symbol}</Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-lable="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
          <AddShoppingCart /> {/*Add to Cart Icon*/}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
