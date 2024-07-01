import React from 'react';
import '../../css/Categories.css';
import Sidebar from '../Sidebar/Sidebar';
import CategorySectionForCategory from './CategorySectionForCategory';

const popularLanguages = [
  { title: 'Hindi', image: 'https://stat4.bollywoodhungama.in/wp-content/uploads/2016/03/M.S.-Dhoni-%E2%80%93-The-Untold-Story-1.jpg' },
  { title: 'Bengali', image: 'https://images.news18.com/ibnlive/uploads/2015/07/bela-seshe3.jpg' },
  { title: 'English', image: 'https://media.vanityfair.com/photos/5384e1ad1fc749a8390001e5/master/pass/sherlock3_sig.jpg' },
  { title: 'Tamil', image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201810/IMG_0299.jpeg?size=1200:675' },
  { title: 'Telugu', image: 'https://cdn.wallpapersafari.com/32/54/xeyAHD.jpg' },
  { title: 'Malayalam', image: 'https://img10.hotstar.com/image/upload/f_auto/sources/r1/cms/prod/1032/1712839861032-i' },
  { title: 'Spanish', image: 'https://media.gqindia.com/wp-content/uploads/2023/06/Daily-BW-for-june-18-Spanish-romance-dramas-movies-1920x1080.jpg'},
  { title: 'Korean', image: 'https://puui.wetvinfo.com/vcover_hz_pic/0/m5ag6gv6uug3vti1597147795657/0'},
  { title: 'Japanese', image: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/39/1506603451-your-name.jpg?crop=1xw:1xh;center,top&resize=980:*'},
  { title: 'Russian', image: 'https://static.hbo.com/content/dam/hbodata/series/chernobyl/key-art/chernobyl-ka-1920.jpg'},
];

const popularGenres = [
  { title: 'Romance', image: 'https://img.freepik.com/free-photo/romantic-just-married-couple-hugging-face-face-against-illuminated-dark-background-with-glowing-sparkles-around_132075-6134.jpg' },
  { title: 'Drama', image: 'https://theorientaldialogue.com/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-27-at-11.59.27.jpeg' },
  { title: 'Family', image: 'https://lh3.googleusercontent.com/lXL1-3UUfZdiReRSjI9FJ-Fvp9GJtHlITx1z-QSy1SqXUhjRbwdGLZ7bEQrKHLVsKr3GFrpgrrgUnl-IbrAawQD0YojccS6qDE86dnWT15w=s750' },
  { title: 'Reality Show', image: 'https://hips.hearstapps.com/hmg-prod/images/reality-tv-show-secrets-1643235062.jpg?crop=0.728xw:0.246xh;0.0195xw,0.387xh&resize=1200:*' },
  { title: 'Comedy', image: 'https://www.eventbrite.co.uk/blog/wp-content/uploads/2022/06/Crowd1-lo-res.jpg' },
  { title: 'Action', image: 'https://t4.ftcdn.net/jpg/06/35/01/43/360_F_635014373_JTiKYJyGpQ72XvvS6O8XhAWEqb9x69hI.jpg'},
  { title: 'Horror', image: 'https://static1.moviewebimages.com/wordpress/wp-content/uploads/2023/06/the-top-10-highest-grossing-horror-movies-of-all-time.jpg'},
  { title: 'Sci-Fi', image: 'https://assets-prd.ignimgs.com/2022/02/08/00-1644351762409.jpg'},
  { title: 'Mystery', image: 'https://filmfare.wwmindia.com/thumb/content/2021/aug/hollywood-mystery-movies-11630416053.jpg?width=1200&height=900'},
  { title: 'Fantasy', image: 'https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/11/Movies-Like-Lord-of-the-Rings.jpg'},
];

const popularSports = [
  { title: 'Cricket', image: 'https://media.istockphoto.com/id/490665558/photo/cricket-ball.jpg?s=612x612&w=0&k=20&c=PzdAOajvhUcSHVH7ZJiqNqNDMap6zHosRuDTgKQBTaQ=' },
  { title: 'Football', image: 'https://cdn.britannica.com/51/190751-131-B431C216/soccer-ball-goal.jpg' },
  { title: 'Tennis', image: 'https://www.bhf.org.uk/-/media/images/information-support/heart-matters/heart-matters/summer-2018/activity/tennis_racket_balls_ss_0618_noexp_620x400.jpg?rev=c18a71fbd05e4a91b4bbc40af01aafaa' },
  { title: 'Badminton', image: 'https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/tdslyl0pptzs6vst4uq5' },
  { title: 'Kabaddi', image: 'https://t3.ftcdn.net/jpg/05/62/89/18/360_F_562891800_dcIUi1Ovx2PCPWILcidOJEGzLGce5D43.jpg'},
  { title: 'Hockey', image: 'https://assets-global.website-files.com/5ca5fe687e34be0992df1fbe/61e26b49c2153d7b15946368_field-hockey-stick-and-ball-2021-08-30-09-04-16-utc-min.jpg'},
  { title: 'Baseball', image: 'https://www.lines.com/upload/default/xl/Ykw/Ykw3TCPNiPIa.jpg'},
  { title: 'Mixed Martial Arts', image: 'https://cdn.asianmma.com/wp-content/uploads/2021/02/Demetrious-Johnson-GP-winner.jpg'},
];

const Category = () => {
    return (
        <div className="categories">
            <Sidebar />
            <h1>browse content by categories</h1>
            <div className="categories-content">
                <CategorySectionForCategory title="Popular Languages" categories={popularLanguages} />
                <CategorySectionForCategory title="Popular Genres" categories={popularGenres} />
                <CategorySectionForCategory title="Popular Sports" categories={popularSports} />
            </div>
        </div>
    );
};

export default Category;
