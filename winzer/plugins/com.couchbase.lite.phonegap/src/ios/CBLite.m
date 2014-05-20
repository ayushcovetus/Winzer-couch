#import "CBLite.h"

#import "CouchbaseLite.h"
#import "CBLListener.h"
#import "CBLRegisterJSViewCompiler.h"

#import <Cordova/CDV.h>

@implementation CBLite

@synthesize liteURL;

- (id) initWithWebView:(UIWebView*)theWebView
{
    self = [super initWithWebView:theWebView];
    if (self) {
        // todo check domain whitelist to give devs a helpful error message
        [self launchCouchbaseLite];
    }
    return self;
}

- (void)getURL:(CDVInvokedUrlCommand*)urlCommand
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[self.liteURL absoluteString]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:urlCommand.callbackId];
}


- (void)launchCouchbaseLite
{
    NSLog(@"Launching Couchbase Lite...");
    CBLManager* dbmgr = [CBLManager sharedInstance];
    CBLRegisterJSViewCompiler();
    self.liteURL = dbmgr.internalURL;
    NSLog(@"Couchbase Lite url = %@", self.liteURL);
}

@end
