import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

 import PageTitle from './components/PageTitle'; 
import DefaultLayout from './layout/DefaultLayout';
import Actions from './pages/ames/actions/Actions';
import Type from './pages/ames/images/Type';
import AboutUS from './pages/ames/AboutUS';
import CategorieAction from './pages/ames/actions/CategorieAction';
import CategorieActionTraduction from './pages/ames/actions/CategorieActionTraduction';
import TypeAction from './pages/ames/actions/TypeAction';
import TypeActionTraduction from './pages/ames/actions/TypeActionTraduction';
import Bienvenue from './pages/ames/Bienvenue';
import Blog from './pages/ames/Blogs/Blog';
import CategorieBlog from './pages/ames/Blogs/CategorieBlog';
import CategorieBlogTraduction from './pages/ames/Blogs/CategorieBlogTraduction';
import Contact from './pages/ames/Contact';
import Donation from './pages/ames/Donation';
import Equipe from './pages/ames/images/Equipe';
import CategorieEvent from './pages/ames/Events/CategorieEvent';
import CategorieEventTraduction from './pages/ames/Events/CategorieEventTraduction';
import Events from './pages/ames/Events/Events';
import TypeEvent from './pages/ames/Events/TypeEvent';
import Histoire from './pages/ames/Histoire';
import ProfileEquipe from './pages/ames/ProfileEquipe';
import StoreImage from './pages/ames/images/StoreImage';
import TypeTraduction from './pages/ames/images/TypeTraduction';
import Impact from './pages/ames/Impact';
import Info from './pages/ames/Info';
import Langue from './pages/ames/Langue';
import Mission from './pages/ames/Mission';
import Participe from './pages/ames/Participe';
import Version from './pages/ames/Version';
import Vontaire from './pages/ames/Vontaire';
import TypeEventTraduction from './pages/ames/Events/TypeEventTraduction';
import MyDashbord from './pages/Dashboard/MyDashbord';
import ImgPartenaire from './pages/ames/images/ImgPartenaire';
import Partenaire from './pages/ames/Partenaire';
import StoreImageAndType from './pages/ames/images/StoreImageAndType';
import Loader from './common/Loader';
import AutreInfo from './pages/ames/autres/AutreInfo';
import AutreType from './pages/ames/autres/AutreType';
import Autre from './pages/ames/autres/Autre';
import Fb from './pages/ames/links/Fb';
import Intag from './pages/ames/links/Intag';
import Video from './pages/ames/links/video';
import Tweeter from './pages/ames/links/tweeter';
 
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>

      <Route
              path="/actions/action"

          element={
            <>
              <PageTitle title="Actions" />
              <Actions />
            </>
          }
        /> <Route
        path="/actions/categorieAction"

        element={
          <>
            <PageTitle title="Categorie-Action" />
            <CategorieAction />
          </>
        }
      />
       <Route
      path="/actions/categorieActionTraduction"

      element={
        <>
          <PageTitle title="Categorie-Action-Traduction" />
          <CategorieActionTraduction />
        </>
      }
    /> 
    
    <Route
    path="/actions/typeAction"

    element={
      <>
        <PageTitle title="Type-Action" />
        <TypeAction />
      </>
    }
  /> <Route
  path="/actions/typeActionTraduction"

  element={
    <>
      <PageTitle title="Type-Action-Traduction" />
      <TypeActionTraduction />
    </>
  }
/> <Route
              path="/blog/blog"

          element={
            <>
              <PageTitle title="Blog" />
              <Blog />
            </>
          }
        /> <Route
        path="/blog/categorieBlog"

        element={
          <>
            <PageTitle title="Categorie-Blog" />
            <CategorieBlog />
          </>
        }
      /> <Route
      path="/blog/categorieBlogTraduction"

      element={
        <>
          <PageTitle title="Categorie-Blog-Traduction" />
          <CategorieBlogTraduction />
        </>
      }
    /> <Route
    path="/events/categorieEvent"

    element={
      <>
        <PageTitle title="Categorie-Event" />
        <CategorieEvent />
      </>
    }
  /> <Route
  path="/events/categorieEventTraduction"

  element={
    <>
      <PageTitle title="Categorie-Event-Traduction" />
      <CategorieEventTraduction />
    </>
  }
/> <Route
              path="/events/event"

          element={
            <>
              <PageTitle title="Events" />
              <Events />
            </>
          }
        /> 
        <Route
        path="/events/typeEvent"

        element={
          <>
            <PageTitle title="Type-Event" />
            <TypeEvent />
          </>
        }
      />
      <Route
            path="/events/typeEventTraduction"

        element={
          <>
            <PageTitle title="Type-Event-Traduction" />
            <TypeEventTraduction />
          </>
        }
      />
      
       <Route
          path="/partenaire"

      element={
        <>
          <PageTitle title="Partenaire" />
          <Partenaire />
        </>
      }
    />
    <Route
          path="/images/imgpartenaire"

      element={
        <>
          <PageTitle title="Store partenaire" />
          <ImgPartenaire  />
        </>
      }
    />
     <Route
    path="/equipe"

    element={
      <>
        <PageTitle title="Profile-Equipe" />
        <ProfileEquipe />
      </>
    }
  /> 
  
  <Route
  path="/images/storeImage"

  element={
    <>
      <PageTitle title="Store-Image" />
      <StoreImage />
    </>
  }
/> 
<Route
  path="/images/storeImageAndType"

  element={
    <>
      <PageTitle title="Store-Image-Type" />
      <StoreImageAndType />
    </>
  }
/> 
<Route
              path="/images/type"

          element={
            <>
              <PageTitle title="Type" />
              <Type />
            </>
          }
        /> 
        <Route
        path="/images/typeTraduction"

        element={
          <>
            <PageTitle title="TypeTraduction" />
            <TypeTraduction />
          </>
        }
      /> <Route
      path="/aboutUS"

      element={
        <>
          <PageTitle title="About-US" />
          <AboutUS />
        </>
      }
    /> <Route
    path="/bienvenue"

    element={
      <>
        <PageTitle title="Bienvenue" />
        <Bienvenue />
      </>
    }
  /> <Route
  path="/contact"

  element={
    <>
      <PageTitle title="Contact" />
      <Contact />
    </>
  }
/>
 <Route
              path="/images/profileEquipe"

          element={
            <>
              <PageTitle title="Equipe" />
              <Equipe />
            </>
          }
        /> 
        
        <Route
        path="/donation"

        element={
          <>
            <PageTitle title="Donation" />
            <Donation />
          </>
        }
      /> <Route
      path="/histoire"

      element={
        <>
          <PageTitle title="Histoire" />
          <Histoire />
        </>
      }
    /> <Route
    path="/impact"

    element={
      <>
        <PageTitle title="Impact" />
        <Impact />
      </>
    }
  /> <Route
  path="/info"

  element={
    <>
      <PageTitle title="Info" />
      <Info />
    </>
  }
/> <Route
              path="/langue"

          element={
            <>
              <PageTitle title="Langue" />
              <Langue />
            </>
          }
        /> <Route
        path="/mission"

        element={
          <>
            <PageTitle title="Mission" />
            <Mission />
          </>
        }
      /> <Route
      path="/images/partenaire"
      element={
        <>
          <PageTitle title="Partenaire" />
          <Partenaire />
        </>
      }
    /> 
    <Route
      path="/autres/type"
      element={
        <>
          <PageTitle title="Autre" />
          <Autre />
        </>
      }
    /> 
    <Route
      path="/autres/typeTraduction"
      element={
        <>
          <PageTitle title="Autre-type" />
          <AutreType />
        </>
      }
    /> 
    <Route
      path="/autres/autresInfo"
      element={
        <>
          <PageTitle title="Autre-Info" />
          <AutreInfo />
        </>
      }
    /> 
     <Route
      path="/link/fb"
      element={
        <>
          <PageTitle title="FaceBook" />
          <Fb />
        </>
      }
    /> 
     <Route
      path="/link/tweeter"
      element={
        <>
          <PageTitle title="tweeter" />
          <Tweeter />
        </>
      }
    /> 
     <Route
      path="/link/instagram"
      element={
        <>
          <PageTitle title="Instagram" />
          <Intag />
        </>
      }
    /> 
    <Route
      path="/link/video"
      element={
        <>
          <PageTitle title="Youtube" />
          <Video />
        </>
      }
    /> 

    <Route
    path="/participe"

    element={
      <>
        <PageTitle title="Participe" />
        <Participe />
      </>
    }
  /> <Route
  path="/version"

  element={
    <>
      <PageTitle title="Version" />
      <Version />
    </>
  }
/> <Route
              path="/vontaire"

          element={
            <>
              <PageTitle title="Volontaire" />
              <Vontaire />
            </>
          }
        /> 
        
        <Route
          index
          element={
            <>
              <PageTitle title="Ames" />
              <MyDashbord />
            </>
          }
        />    
        
        
      </Routes>
    </DefaultLayout>
  );
}

export default App;
