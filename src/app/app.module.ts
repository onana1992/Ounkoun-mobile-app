import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, DeepLinkConfig} from 'ionic-angular';
import { RestProvider } from '../providers/rest/rest';
import { StorageProvider } from '../providers/storage/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { HttpModule } from '@angular/http';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { FavorisPage } from '../pages/favoris/favoris';
import { PanierPage } from '../pages/panier/panier';
import { RecherchePage } from '../pages/recherche/recherche';
import { ConnexionPage } from '../pages/connexion/connexion';
import { InscriptionPage } from '../pages/inscription/inscription'; 
import { PopoverPage } from '../pages/popover/popover';
import { CategoriePage } from '../pages/categorie/categorie';
import { ProduitPage } from '../pages/produit/produit';
import { SousCategoriePage } from '../pages/sous-categorie/sous-categorie';
import { SousSCategoriePage } from '../pages/sous-s-categorie/sous-s-categorie';
import { ResultatRecherchePage } from '../pages/resultat-recherche/resultat-recherche';
import { ActivationComptePage } from '../pages/activation-compte/activation-compte';
import { ProfilPage } from '../pages/profil/profil';
import { PasswordPage } from '../pages/password/password';
import { AdressePage } from '../pages/adresse/adresse';
import { ProduitParMarquePage } from '../pages/produit-par-marque/produit-par-marque';
import { CommandePage } from '../pages/commande/commande';
import { SampleModalPage } from '../pages/sample-modal/sample-modal';
import { LocationStrategy,PathLocationStrategy } from '@angular/common';
import { MescmdPage } from '../pages/mescmd/mescmd';
import { CommandModalPage } from  '../pages/command-modal/command-modal';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";
import { PanierBwmPage} from '../pages/panier-bwm/panier-bwm';
import { PasswordRecoverPage} from '../pages/password-recover/password-recover';
import { RecoverPasswordConfirmPage} from '../pages/recover-password-confirm/recover-password-confirm';
import { FiltreModalCatPage} from '../pages/filtre-modal-cat/filtre-modal-cat';
import { HideFabDirective} from "../directives/hide-fab/hide-fab";
import { AutoHideDirective  } from "../directives/auto-hide/auto-hide";
import { SocialSharing } from '@ionic-native/social-sharing';
import { TruncatePipe } from './exponential-strength.pipe';
import { AboutPage} from '../pages/about/about';
import { AidePage} from '../pages/aide/aide';
import { CommandSucceedPage} from '../pages/command-succeed/command-succeed';
import { ContactPage} from '../pages/contact/contact';
import { FitreModalSouscatPage} from '../pages/fitre-modal-souscat/fitre-modal-souscat';
import { FiltreModalSsousCategoriePage} from '../pages/filtre-modal-ssous-categorie/filtre-modal-ssous-categorie';
import { FiltreModalRecherchePage} from '../pages/filtre-modal-recherche/filtre-modal-recherche';
import { FiltreModalVendeurPage} from '../pages/filtre-modal-vendeur/filtre-modal-vendeur';
import { RatingModalPage} from '../pages/rating-modal/rating-modal';
import { Ionic2RatingModule} from 'ionic2-rating';
import { ProduitParVendeurPage} from '../pages/produit-par-vendeur/produit-par-vendeur';
import { AideLivraisonPage} from   '../pages/aide-livraison/aide-livraison';
import { AidePaiementPage} from   '../pages/aide-paiement/aide-paiement';
import { AideRetourPage} from   '../pages/aide-retour/aide-retour';
import { AideCommandePage} from   '../pages/aide-commande/aide-commande';
import { AideFraisPage} from   '../pages/aide-frais/aide-frais'; 
import { RelaisModalPage} from   '../pages/relais-modal/relais-modal'; 
import { NoConnexionPage} from  '../pages/no-connexion/no-connexion'; 
import { CommandSucceed2Page } from  '../pages/command-succeed2/command-succeed2';
import { PaiementPage } from  '../pages/paiement/paiement';
import { EncheresPage } from  '../pages/encheres/encheres';
import { ProduitEncherePage } from '../pages/produit-enchere/produit-enchere';
import { EnchereModalPage} from '../pages/enchere-modal/enchere-modal';
import { MesEncheresPage} from '../pages/mes-encheres/mes-encheres';
import { EnchereRecherePage} from '../pages/enchere-rechere/enchere-rechere';
import { AideConditionPage}  from  '../pages/aide-condition/aide-condition'; 
import { BestProductsPage}  from  '../pages/best-products/best-products';
import { DownloadPage } from  '../pages/download/download';



let deepLinkConfig: DeepLinkConfig = {
  links: [
    { component:  HomePage, name: 'home', segment: '' },
	{ component:  CategoriePage, name: 'Categorie', segment: 'categorie/:nomCategorie', defaultHistory: [HomePage] },
	{ component:  SousCategoriePage, name: 'Sous-categorie', segment: 'sous-categorie/:nomSousCategorie', defaultHistory: [HomePage] },
	{ component:  SousSCategoriePage, name: 'Sous-sous-categorie', segment: 'sous-sous-categorie/:nomSousCategorie', defaultHistory: [HomePage] },
	{ component:  ProduitParMarquePage, name: 'produit-par-marque', segment: 'marque/:nomMarque',defaultHistory: [HomePage]},
	{ component:  ResultatRecherchePage, name: 'resultat-recherche', segment: 'resultat-recherche/:nomSousCategorie',defaultHistory: [HomePage] },
	{ component:  ProduitPage, name: 'produit', segment: 'produit/:ProduitName',defaultHistory: [HomePage] },
	{ component:  ProfilPage, name: 'Profil', segment: 'profil',defaultHistory: [HomePage] },
	{ component:  PasswordPage, name: 'Password', segment: 'password',defaultHistory: [HomePage] },
	{ component:  AdressePage, name: 'adresse', segment: 'adresse',defaultHistory: [HomePage] },
	{ component:  FavorisPage, name: 'favory', segment: 'favoris',defaultHistory: [HomePage] },
	{ component:  RecherchePage, name: 'recherche', segment: 'recherche',defaultHistory: [HomePage] },
	{ component:  CommandePage, name: 'commande', segment: 'commande',defaultHistory: [HomePage] },
	{ component:  MescmdPage, name: 'mes-commande', segment: 'mes-commande',defaultHistory: [HomePage] },
	{ component:  CommandModalPage, name: 'command-modal', segment: 'command-modal',defaultHistory: [HomePage] },
	{ component:  PanierBwmPage, name: 'panierBWM', segment: 'panierBWM',defaultHistory: [HomePage]},
	{ component:  InscriptionPage, name: 'inscription', segment: 'inscription',defaultHistory: [HomePage]},
	{ component:  ActivationComptePage, name: 'activation', segment: 'activation',defaultHistory: [HomePage]},
	{ component:  PasswordRecoverPage, name: 'PasswordRecover', segment: 'PasswordRecover',defaultHistory: [HomePage]},
	{ component:  RecoverPasswordConfirmPage, name: 'PasswordRecoverConfirm', segment: 'PasswordRecoverConfirm'},
	{ component:  AboutPage, name: 'à propos', segment: 'à propos',defaultHistory: [HomePage]},
	{ component:  AidePage, name: 'aide', segment: 'aide',defaultHistory: [HomePage]},
	{ component:  CommandSucceedPage, name: 'commandSuccedd', segment: 'commande/success',defaultHistory: [HomePage]},
	{ component:  ProduitParVendeurPage, name: 'Vendeur', segment: 'vendeur/:seller',defaultHistory: [HomePage] },
	{ component:  AideLivraisonPage, name: 'AideLivraison', segment: 'aide-livraison',defaultHistory: [HomePage] },
	{ component:  AideRetourPage, name: 'AideRetour', segment: 'aide-retour',defaultHistory: [HomePage] },
	{ component:  AideCommandePage, name: 'AideCommande', segment: 'aideCommande',defaultHistory: [HomePage] },
	{ component:  AideFraisPage, name: 'AideCommande', segment: 'aideCommande',defaultHistory: [HomePage] },
	{ component:  AideConditionPage, name: 'AideCondition', segment: 'aideCondition',defaultHistory: [HomePage] },
	{ component:  EncheresPage, name: 'encheres', segment: 'encheres',defaultHistory: [HomePage] },
	{ component:  ProduitEncherePage, name: 'enchere', segment: 'enchere/:numEnchere',defaultHistory: [HomePage] }
  ] 
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
	FavorisPage,
	PanierPage,
	RecherchePage,
	ConnexionPage,
	PopoverPage,
	InscriptionPage,
	CategoriePage,
	ProduitPage,
	SousCategoriePage,
	SousSCategoriePage,
	ResultatRecherchePage,
	ActivationComptePage,
	ProfilPage,
	PasswordPage,
	AdressePage,
	ProduitParMarquePage,
	CommandePage,
	SampleModalPage,
	MescmdPage,
	CommandModalPage,
	PanierBwmPage,
	PasswordRecoverPage,
	RecoverPasswordConfirmPage,
	FiltreModalCatPage,
	AboutPage,
	AidePage,
	ContactPage,
	RatingModalPage,
	CommandSucceedPage,
	FitreModalSouscatPage,
	FiltreModalSsousCategoriePage,
	FiltreModalVendeurPage,
	FiltreModalRecherchePage,
	HideFabDirective,
	AutoHideDirective,
	TruncatePipe,
	ProduitParVendeurPage,
	AideLivraisonPage,
	AidePaiementPage,
	AideRetourPage,
	AideCommandePage,
	AideFraisPage,
	RelaisModalPage,
	NoConnexionPage,
	CommandSucceed2Page,
	PaiementPage,
	EncheresPage,
	ProduitEncherePage,
	EnchereModalPage,
	MesEncheresPage,
	EnchereRecherePage,
	AideConditionPage,
	BestProductsPage,
	DownloadPage
  ],
  imports: [
    BrowserModule,
    //IonicModule.forRoot(MyApp),
    IonicModule.forRoot(MyApp, {}, deepLinkConfig),
	Ionic2RatingModule,
	HttpModule,
	FormsModule,
	ReactiveFormsModule,
	IonicStorageModule.forRoot(),
	ElasticHeaderModule,
	IonicImageViewerModule,
	CurrencyMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
	FavorisPage,
	PanierPage,
	RecherchePage,
	ConnexionPage,
	PopoverPage,
	InscriptionPage,
	CategoriePage,
	ProduitPage,
	SousCategoriePage,
	SousSCategoriePage,
	ResultatRecherchePage,
	ActivationComptePage,
	ProfilPage,
	PasswordPage,
	AdressePage,
	ProduitParMarquePage,
	CommandePage,
	SampleModalPage,
	MescmdPage,
	CommandModalPage,
	PanierBwmPage,
	PasswordRecoverPage,
	RecoverPasswordConfirmPage,
	FiltreModalCatPage,
	FitreModalSouscatPage,
	FiltreModalSsousCategoriePage,
	FiltreModalRecherchePage,
	FiltreModalVendeurPage,
	AboutPage,
	AidePage,
	ContactPage,
	CommandSucceedPage,
	RatingModalPage,
	ProduitParVendeurPage,
	AideLivraisonPage,
	AidePaiementPage,
	AideRetourPage,
	AideCommandePage,
	AideFraisPage,
	RelaisModalPage,
	NoConnexionPage,
	CommandSucceed2Page,
	PaiementPage,
	EncheresPage,
	ProduitEncherePage,
	EnchereModalPage,
	MesEncheresPage,
	EnchereRecherePage,
	AideConditionPage,
	BestProductsPage,
	DownloadPage	
  ],
  
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataServiceProvider,
	RestProvider,
    StorageProvider,
	SocialSharing,
	//{provide: LocationStrategy, useClass: PathLocationStrategy }// pour activer le mode html5
  ]
})
export class AppModule {}
