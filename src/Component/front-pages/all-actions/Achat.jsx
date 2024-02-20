import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Backthumb from 'assets/images/typeMedia/backthumb.jpg';
import Video from 'assets/images/typeMedia//video2.jpg';
import Sound from 'assets/images/typeMedia/audio.jpg';
import Article from 'assets/images/typeMedia/article.jpg';
import { Link } from 'react-router-dom';
import { Box, CardActionArea } from '@mui/material';

const ContentCardFront = (props) => {
    const data = props.items;
    console.log('ito ny data Content Card Front');
    console.log(data);
    let imageSrc;

    switch (data.contentTypeName) {
        case 'Article':
            imageSrc = Article;
            break;
        case 'Audio':
            imageSrc = Sound;
            break;
        case 'Vidéo':
            imageSrc = Video;
            break;
        case 'PDF':
            imageSrc = Backthumb;
            break;
        default:
            imageSrc = Video;
    }



    return (
        <Card
            sx={{
                maxWidth: 345,
                maxHeight: 325,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
            }}
        >
            <CardActionArea component={Link} to={`descriFront/${data.id}`}>
                <CardMedia component="img" height="180" image={imageSrc} alt="Image" />
                <CardContent>
                    <Box
                        style={{
                            width: 'auto',
                            height: 'auto',
                            padding: '5px',
                            position: 'absolute',
                            top: 8,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            right: 8,
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            zIndex: 1
                        }}
                    >
                    </Box>

                    <Typography gutterBottom variant="h4" component="div" sx={{ textDecoration: 'none' }}>
                        {data.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: 'none', maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                        {data.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ContentCardFront;
