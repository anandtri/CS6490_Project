#!/usr/bin/perl -w

use strict;
use Getopt::Std;
use Mail::MboxParser;
use Date::Parse;

my $USER_PAT = '(mike|michael|hibler|eric|eide)';

my $CACHEDIR = '/tmp/mboxcache';
my $CACHEFILE = "$CACHEDIR/cfile";
my $NOW = time();
my $MINSTAMP = $NOW - (86400 * 14);

my $popts = {
    enable_cache => 1,
    enable_grep  => 1,
    cache_file_name => $CACHEFILE,
};

my $mbox_file = $ARGV[0];
my $mbox = Mail::MboxParser->new($mbox_file,
				 decode => 'ALL',
				 parseropts => $popts);

die $mbox unless ref $mbox;

my $cnt = 0;
while (my $msg = $mbox->next_message()) {
    my $subj = $msg->header->{'subject'};
    my $type = $msg->effective_type();
    next unless $subj;

    next unless exists($msg->header->{'date'});
    my $date = $msg->header->{'date'};
    my $stamp = str2time($msg->header->{'date'});
    next unless defined($stamp) && $stamp > $MINSTAMP && $stamp < $NOW;
    my $body = $msg->body($msg->find_body());
    next unless ref $body;
    my @urls = $body->extract_urls(unique => 1);
    next unless @urls;

    my $skipit = 0;
    foreach my $urlh (@urls) {
	if ($urlh->{'url'} =~ /$USER_PAT/i) {
	    $skipit = 1;
	    last;
	}
    }
    next if $skipit;

    $subj =~ s/$USER_PAT/******/ig;

    print "Subject: $subj\n";
    print "Date: $date\n";
    foreach my $urlh (@urls) {
	print "$urlh->{'url'}\n";
    }
    print "\n";
}
