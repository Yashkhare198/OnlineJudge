#include<bits/stdc++.h>
using namespace std;
#define ll long long int
int main()
{
    int n,w;
    cin>>n>>w;
    vector<pair<ll,ll>>arr(n);
    
    for(int i=0;i<n;i++)
    {
        cin>>arr[i].first;
        arr[i].second=i+1;
    }
    sort(arr.begin(),arr.end());
    int s=0;
    int e=n-1;
    bool x=false;
    while(s<e)
    {
        if(arr[s].first+arr[e].first==w)
        {
            x=true;
            cout<<min(arr[s].second,arr[e].second)<<" "<<max(arr[e].second,arr[s].second);
            break;
        }
        else if(arr[s].first+arr[e].first>w)
        {
            e--;
        }
        else
        {
            s++;
        }
    }
    if(x==false)
    {
        cout<<-1;
    }
    
 
}