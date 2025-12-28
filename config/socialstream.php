<?php

use JoelButcher\Socialstream\Features;
use JoelButcher\Socialstream\Providers;

return [
    'guard' => 'web', // used if Fortify is not installed
    'middleware' => ['web'],
    'providers' => [
        Providers::google(),
        Providers::twitterOAuth2(),
        [
            'id'=> 'tiktok',
            'name'=> 'Tiktok',
            'label'=> 'Tiktok',
        ]
    ],
    'features' => [
        Features::generateMissingEmails(),
        Features::createAccountOnFirstLogin(),
        Features::globalLogin(),
        Features::authExistingUnlinkedUsers(),
        Features::rememberSession(),
        Features::providerAvatars(),
        Features::refreshOAuthTokens(),
    ],
    'home' => '/',
    'redirects' => [
        'login' => '/',
        'register' => '/',
        'login-failed' => '/login',
        'registration-failed' => '/register',
        'provider-linked' => '/user/profile',
        'provider-link-failed' => '/user/profile',
    ]
];
