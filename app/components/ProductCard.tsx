import { Box, Link, IconButton, Card, Typography, Grid } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { IProduct } from '../types/product';

type Props = {
  products: IProduct[];
};

const ProductsCard = (props: Props) => {
  const { products = [] } = props;
  return (
    <Grid container spacing={2}>
      {products.length > 0 ? (
        products.map((product) => (
          <Grid
            item
            key={product.id}
            xs={12}
            md={3}
            sx={{
              marginBottom: 1,
              marginTop: 1,
            }}
          >
            <Card
              key={product.id}
              sx={{
                padding: 1,
                height: '100%',
              }}
            >
              <Link
                href={product.id}
                component='a'
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: 150,
                    border: '0px solid',
                  }}
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    layout='fill'
                    objectFit='contain'
                  />
                </Box>
              </Link>
              <Typography sx={{ marginTop: 1 }}>
                {product.title.length > 30
                  ? `${product.title.slice(0, 30)}...`
                  : product.title}
              </Typography>
              <Typography variant='body2' sx={{ marginTop: 1 }}>
                ASIN:{product.code}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography>{product.dealPrice}</Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      ml: 1,
                      textDecoration: 'line-through',
                      color: 'text.disabled',
                    }}
                  >
                    {product.mrp}
                  </Typography>
                </Box>
                <Box sx={{ alignSelf: 'flex-end' }}>
                  <Link href={`/${product.id}/edit`} component='a'>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography>No data found</Typography>
      )}
    </Grid>
  );
};

export default ProductsCard;
