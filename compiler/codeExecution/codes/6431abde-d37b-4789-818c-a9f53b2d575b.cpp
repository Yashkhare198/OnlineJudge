#include<bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin>>n;
    vector<int>arr(n);
    for(int i=0;i<n;i++)
    {
        cin>>arr[i];
    }
    vector<int>out(n);
    int s=0;
    int e=n-1;
    for(int i=n-1;i>=0;i--)
    {
        if(abs(arr[s])>abs(arr[e]))
        {
            out[i]=arr[s]*arr[s];
            s++;
        }
        else
        {
            out[i]=arr[e]*arr[e];
            e--;
        }
        
    }
    for(int i=0;i<n;i++)
    {
        cout<<out[i]<<" ";
    }
}