import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { BatchModule } from './batch/batch.module';
import { CoursedetailModule } from './coursedetail/coursedetail.module';
import { NotesModule } from './notes/notes.module';
import { ZoomModule } from './zoom/zoom.module';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './auth/login/login.component';
import { ForumModule } from './forum/forum.module';
import { MessagesModule } from 'primeng/messages';
import { GroupModule } from './group/group.module';
import { CommonSpaceModule } from './common-space/common-space.module';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GoogleLoginComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    NgxLocalStorageModule.forRoot(),
    AuthModule,
    SocialLoginModule,
    DashboardModule,
    MessagesModule,
    CoursedetailModule,
    GroupModule,
    InputTextModule,
    DropdownModule,
    BatchModule,
    NotesModule,
    SidebarModule,
    ButtonModule,
    ForumModule,
    CommonModule,
    FormsModule,
    CommonSpaceModule,
    ToastModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
/*              '936277757414-hmmhl3rn4falcjefkn0jeu5dec35otur.apps.googleusercontent.com'*/
              '621686135789-hk19l687pm2u9sum04h341pik5lvbsv6.apps.googleusercontent.com'

            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
