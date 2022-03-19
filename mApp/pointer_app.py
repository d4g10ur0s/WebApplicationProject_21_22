#python things
import calendar as clnd
import datetime as dt
from geopy import distance
import re
#kivy things
from kivy.lang import Builder
from kivy.app import App

from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.relativelayout import RelativeLayout
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.popup import Popup
from kivy.uix.scrollview import ScrollView
from kivy.uix.dropdown import DropDown

from kivy.uix.behaviors import ButtonBehavior
from kivy.properties import ListProperty, StringProperty
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
from kivy.uix.label import Label
from kivy.uix.image import Image
from functools import partial
from kivy.uix.spinner import Spinner

from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.core.window import Window
#gia map
from kivy_garden.mapview import MapView
from kivy_garden.mapview import MapMarker
from kivy_garden.mapview import MapMarkerPopup
from kivy_garden.mapview import MapLayer
from kivy_garden.mapview import MarkerMapLayer
from kivy_garden.mapview import MapSource
#gia gps
from plyer import gps
#gia networking
import requests
import json
#gia functions
from functools import partial

Builder.load_file('pointer_app.kv')
#user class
def double_number_function(last):
    x = range(0,last)
    arr = []
    for k in x:
        if len(str(k)) > 1:
            arr.append(str(k))
        else:
            arr.append('0'+str(k))
    return arr
class myConnection:
    url = 'http://localhost:8080'
    mdict = None
    def __init__(self,mdict,url_plus):
        self.mdict = mdict
        self.url = self.url+'/'+url_plus

    def send_dict(self):
        x = requests.post(self.url, data = json.dumps(self.mdict))
        return x

#
#FriendRequest class
#
#
class FriendRequest:
    _user1
    _user2
    _sended
    _state_1
    _state_2
    def __init__(self,user1,user2,sended,state1,state2):
        self._user1 = user1
        self._user2 = user2
        self._sended = sended
        self._state_1 = state_1
        self._state_2 = state_2

    def set_user_1(self,user_1):
        self._user1 = user_1
    def set_user_2(self,user_2):
        self._user2 = user_2
    def set_sended(self,sended):
        self._sended = sended
    def set_state_1(self,state_1):
        self._state_1 = state_1
    def set_state_2(self,state_2):
        self._state_2 = state_2

    def get_user_1(self):
        return self._user1
    def get_user_2(self):
        return self._user2
    def get_sended(self):
        return self._sended
    def get_state_1(self):
        return self._state_1
    def get_state_2(self):
        return self._state_2

    def accepted(self):
        self._state_1 = 'Accepted'
    def rejected(self):
        self._state_1 = 'Rejected'
        self._state_2 = 'Rejected'

#
#FriendRequest class
#
#Location Class
#
class Location:
    #location info
    _name = "" #1
    _lat = 0.0 #2
    _lon = 0.0 #2
    _counter = 0 #3
    _prv = False#dior8wse kai allou
    #user info
    _creator = None #5

    def __init__(self,name = "",lat = 0.0,lon = 0.0,prv = False,creator = None):
        #location info
        self._name = name
        self._lat = lat
        self._lon = lon
        self._counter = 0#8a allaksei
        self._prv = False
        #user info
        self._creator = creator
    #
    #setter
    #
    #location info
    def set_name(self,name = ""):
        self._name = name
    def set_coord(self,lon = 0.0,lat = 0.0):
        self._lon = lon
        self._lat = lat
    def set_counter(self,counter):
        self._counter = counter
    def set_prv(self,prv):
        self._prv = prv
    #user info
    def set_creator(self,creator = None):
        self._creator = creator
    #
    #getter
    #
    #location info
    def get_name(self):
        return self._name
    def get_lon(self):
        return self._lon
    def get_lat(self):
        return self._lat
    def get_coord(self):
        return (self._lon,self._lat)
    def get_counter(self):
        return self._counter
    def get_prv(self):
        return self._prv
    #user info
    def get_creator(self):
        return self._creator
#
#Location Class
#

class User:
    #user info
    _username = None
    _email = None
    _coords = None
    _points = 0
    def __init__(self,username = "",email = "", coords = "",points = 0):
        #user info
        self._username = username
        self._email = email
        self._coords = coords
        self._points = points
    #
    #setter
    #
    #user info
    def set_username(self,username):
        self._username = username
    def set_email(self,email = ""):
        self._email = email
    def set_coords(self, coords):
        self._coords = coords
    def set_points(self, points):
        self._points=points
    #
    #getter
    #
    #user info
    def get_points(self):
        return self._points
    def get_username(self):
        return self._username
    def get_email(self):
        return self._email
    def get_coords(self):
        return self._coords
    def get_lat(self):
        return self._coords["lat"]
    def get_lon(self):
        return self._coords["lon"]
    def user_dict(self):
        mdict = {
        "username": self._username,
        "email": self._email,
        "coords" : {
            "lat" : self._coords["lat"],
            "lon" : self._coords["lon"]
            }
        }

        return mdict
#
#Gia User
#
class UserChoiceButton(Button):
    #krataei ena number
    _num = 0
    def __init__(self,num ,**kwargs):
        super(UserChoiceButton, self).__init__(**kwargs)
        self._num = num
    def get_num(self):
        return self._num
class StateButton(Button):
    pass

class Chooser(TextInput):
    _current_user = None
    _profile_callback = None
    choicesfile = StringProperty()
    choiceslist = ListProperty([])

    def __init__(self, **kwargs):
        self.choicesfile = kwargs.pop('choicesfile', '')  # each line of file is one possible choice
        self.choiceslist = kwargs.pop('choiceslist', [])  # list of choices
        super(Chooser, self).__init__(**kwargs)
        self.multiline = False
        self.halign = 'left'
        self.bind(choicesfile=self.load_choices)
        self.bind(text=self.on_text)
        self.load_choices()
        self.dropdown = None

    def open_dropdown(self, *args):
        if self.dropdown:
            self.dropdown.open(self)
    #edw ta ypopshfia names
    def load_choices(self):
        if self.choicesfile:
            with open(self.choicesfile) as fd:
                for line in fd:
                    self.choiceslist.append(line.strip('\n'))
        self.values = []

    def keyboard_on_key_down(self, window, keycode, text, modifiers):
        if self.suggestion_text and keycode[0] == ord('\r'):  # enter selects current suggestion
            self.suggestion_text = ' '  # setting suggestion_text to '' screws everything
            self.text = self.values[0]
            if self.dropdown:
                self.dropdown.dismiss()
                self.dropdown = None
        else:
            super(Chooser, self).keyboard_on_key_down(window, keycode, text, modifiers)

    def on_text(self, chooser, text):
        if self.dropdown:
            self.dropdown.dismiss()
            self.dropdown = None
        if text == '':
            return
        #edw pairnw ypopshfia onomata
        else:
            #stelnw text
            mdict = {
                "msg" : {
                    "name":str(self.text)
                }
            }
            mc = myConnection(mdict,'simple_search')
            res = mc.send_dict()
            res = json.loads(res.text)
            values = []
            for r in res["info"]:
                u = from_Dict_to_User(r,self._current_user)
                if not(u == None):#an den einai o current user
                    self.choiceslist.append(u)
                    values.append(u.get_username())
            self.values = values
            if len(values) > 0:
                #if len(self.text) < len(self.values[0]):
                #    self.suggestion_text = self.values[0][len(self.text):]
                #else:
                #    self.suggestion_text = ' '  # setting suggestion_text to '' screws everything
                self.dropdown = DropDown()
                mc = 0
                for val in self.values:
                    self.dropdown.add_widget(UserChoiceButton(num = mc,text=val, size_hint_y=None, height=48, on_release=self.do_choose))
                    mc+=1
                self.dropdown.open(self)

    def do_choose(self, butt):
        #8a phgainei se user profile
        selected_user = self.choiceslist[butt.get_num()]#exw user
        if self.dropdown:
            self.dropdown.dismiss()
            self.dropdown = None
        #ke edw kalw callback gia tade user
        self._profile_callback(user = selected_user)
        #self.text = butt.text

    def set_current_user(self,usr):
        self._current_user = usr
    def set_profile_callback(self,callback):
        self._profile_callback = callback

class FriendRequest_Layout(BoxLayout):
    pass
    #def __init__(self,usr,asb,**kwargs):
    #    super(FriendRequ_Scroll_View, self).__init__(**kwargs)
    #    for i in range(10):
    #        self.ids.main_content.friend_requests.add_widget(FriendRequest_Layout())

class FriendsRequLayout(BoxLayout):
    _user = None
    _search_profile_callback = None
    def __init__(self,usr,tocallback_profile,**kwargs):
        super(FriendsRequLayout, self).__init__(**kwargs)
        #pairnw friend request apo vash
        self._user = usr
        self.ids.search4friends.search_bar.set_current_user(self._user)
        #gia search pathma dropdown callback
        self.ids.search4friends.search_bar.set_profile_callback(tocallback_profile)#8a htan kalo na checkarw ke server?
        #self.ids.search4friends.subutton.bind(on_press = self.to_user_profile)
        for i in range(10):
            f = FriendRequest_Layout()
            #f.bind(minimum_height = f.setter('height'))
            self.ids.main_content.friend_requests.add_widget(f)

class Event_Creation_Layout(BoxLayout):
    to_save=[False,False,False,False,False]
    _creator = None
    _after_submitted = None

    def __init__(self,usr,asb,**kwargs):
        super(Event_Creation_Layout, self).__init__(**kwargs)
        self._creator = usr
        self._after_submitted = asb
        #vazw to event
        #gia name text input
        self.ids.info_layout.name.bind(focus = self.on_focus_ename)
        #gia location name
        self.ids.info_layout.location.bind(focus = self.on_focus_location)
        #gia points
        self.ids.info_layout.points_loose.bind(focus = self.on_focus_points)
        self.ids.info_layout.points_earned.bind(focus = self.on_focus_points)
        #gia capacity
        self.ids.info_layout.capacity.bind(focus = self.on_focus_capacity)
        #gia spinners
        self.ids.info_layout.created.spinner_year.values = [str(dt.datetime.today().year) , str(dt.datetime.today().year + 1)]
        self.ids.info_layout.created.spinner_month.values = list(clnd.month_name[1:])
        self.ids.info_layout.created.spinner_day.values = double_number_function(30)
        self.ids.info_layout.created.spinner_hour.values = double_number_function(24)
        self.ids.info_layout.created.spinner_minute.values = double_number_function(60)

        self.ids.info_layout.expired.spinner_year.values = [str(dt.datetime.today().year) , str(dt.datetime.today().year + 1)]
        self.ids.info_layout.expired.spinner_month.values = list(clnd.month_name[1:])
        self.ids.info_layout.expired.spinner_day.values = double_number_function(30)
        self.ids.info_layout.expired.spinner_hour.values = double_number_function(24)
        self.ids.info_layout.expired.spinner_minute.values = double_number_function(60)

        self.ids.info_layout.subutton.disabled = True#sthn arxh disabled
        #gia submit
        self.ids.info_layout.subutton.bind(on_press = self.send_info)

    def on_focus_points(self,instance,focus,**kwargs):
        if focus :
            pass
        else:
            try:
                int(self.ids.info_layout.points_loose.text)
                int(self.ids.info_layout.points_earned.text)
                self.to_save[2] = True
                self.to_save[3] = True
            except ValueError:
                self.to_save[2] = False
                self.to_save[3] = False

            finally :
                if self.to_save[0] and self.to_save[1] and self.to_save[2] and self.to_save[3] and self.to_save[4] :
                    self.ids.info_layout.subutton.disabled = False
                else:
                    self.ids.info_layout.subutton.disabled = True

    def on_focus_capacity(self,instance,focus,**kwargs):
        if focus :
            pass
        else:
            try:
                int(self.ids.info_layout.capacity.text)
                self.to_save[4] = True
            except ValueError:
                self.to_save[4] = False

            finally :
                if self.to_save[0] and self.to_save[1] and self.to_save[2] and self.to_save[3] and self.to_save[4]:
                    self.ids.info_layout.subutton.disabled = False
                else:
                    self.ids.info_layout.subutton.disabled = True

    def on_focus_ename(self,instance,focus,**kwargs):
        if focus :
            pass
        else:
            if len(self.ids.info_layout.name.text) > 4 :
                self.to_save[0] = True
            else:
                self.to_save[0] = False

            if self.to_save[0] and self.to_save[1] and self.to_save[2] and self.to_save[3] and self.to_save[4] :
                self.ids.info_layout.subutton.disabled = False
            else:
                self.ids.info_layout.subutton.disabled = True

    def on_focus_location(self,instance,focus,**kwargs):
        if focus :
            pass
        else:
            if len(self.ids.info_layout.location.text) > 4:
                self.to_save[1] = True
            else:
                self.to_save[1] = False

            if self.to_save[0] and self.to_save[1] and self.to_save[2] and self.to_save[3] and self.to_save[4] :
                self.ids.info_layout.subutton.disabled = False
            else:
                self.ids.info_layout.subutton.disabled = True

    def send_info(self,obj,**kwargs):
        #pairnw thn plhroforia gia dates
        crt = self.ids.info_layout.created.spinner_year.value+'/'+self.ids.info_layout.created.spinner_month.value+'/'+self.ids.info_layout.created.spinner_day.value+'/'+self.ids.info_layout.created.spinner_hour.value+'/'+self.ids.info_layout.created.spinner_minute.value
        exp = self.ids.info_layout.expired.spinner_year.value+'/'+self.ids.info_layout.expired.spinner_month.value+'/'+self.ids.info_layout.expired.spinner_day.value+'/'+self.ids.info_layout.expired.spinner_hour.value+'/'+self.ids.info_layout.expired.spinner_minute.value

        mdict = {
            "msg" : {
                "name":str(self.ids.info_layout.name.text),
                "lname" : str(self.ids.info_layout.location.text),
                "pearned":str(self.ids.info_layout.points_earned.text),
                "ploose":str(self.ids.info_layout.points_loose.text),
                "private" : False,
                "capacity":str(self.ids.info_layout.capacity.text),
                "creator" : self._creator.get_username(),
                "created" : str(dt.datetime.strptime(crt, '%Y/%m/%d %H:%M')),#prepei na paw ke sto server_db.js
                "expired" : str(dt.datetime.strptime(exp, '%Y/%m/%d %H:%M'))#den exei oloklhrw8ei
            }
        }
        mc = myConnection(mdict,'event_creation')
        res = mc.send_dict()
        res = json.loads(res.text)
        try :
            print(res["info"])
            if int(res["info"]):
                mdict = self._creator.user_dict()#giati?
                self._after_submitted()
        except:#8es mhpws kapoio popup?
            pass

class Location_Creation_Layout(BoxLayout):
    to_save=[False,False,False]
    _creator = None
    _location = None
    _after_submitted = None

    def __init__(self,usr,lon,lat,asb,**kwargs):
        super(Location_Creation_Layout, self).__init__(**kwargs)
        self._after_submitted = asb
        self._creator = usr
        #vazw to location
        #gia name text input
        self.ids.info_layout.name.bind(focus = self.on_focus_lname)
        #gia lat
        self.ids.info_layout.lat.text = str(lat)
        self.ids.info_layout.lat.bind(focus = self.on_focus_lat_lon)
        #gia lon
        self.ids.info_layout.lon.text = str(lon)
        self.ids.info_layout.lon.bind(focus = self.on_focus_lat_lon)
        #gia submit
        self.ids.info_layout.subutton.bind(on_press = self.send_info)

        self.ids.info_layout.subutton.disabled = True#sthn arxh disabled

    def on_focus_lname(self,instance,focus,**kwargs):
        if focus :
            pass
        else:
            if len(self.ids.info_layout.name.text) > 4 :
                self.to_save[0] = True
            else:
                self.to_save[0] = False

            if self.to_save[0] and self.to_save[1] and self.to_save[2]:
                self.ids.info_layout.subutton.disabled = False
                self.ids.info_layout.subutton.disabled = False
            else:
                self.ids.info_layout.subutton.disabled = True
                self.ids.info_layout.subutton.disabled = True

    def on_focus_lat_lon(self,instance,focus,**kwargs):
        if focus :
            pass
        else:
            try:
                float(self.ids.info_layout.lat.text)
                float(self.ids.info_layout.lon.text)
                self.to_save[1] = True
                self.to_save[2] = True
            except ValueError:
                self.to_save[1] = False
                self.to_save[2] = False
            finally :
                if self.to_save[0] and self.to_save[1] and self.to_save[2]:
                    self.ids.info_layout.subutton.disabled = False
                    self.ids.info_layout.subutton.disabled = False
                else:
                    self.ids.info_layout.subutton.disabled = True
                    self.ids.info_layout.subutton.disabled = True

    def send_info(self,obj,**kwargs):
        mdict = {
            "msg" : {
                "name":str(self.ids.info_layout.name.text),
                "coords" : {
                    "lat" : str(self.ids.info_layout.lat.text),
                    "lon" : str(self.ids.info_layout.lon.text)
                },
                "private" : False,
                "creator" : self._creator.get_username()
            }
        }
        mc = myConnection(mdict,'location_creation')
        res = mc.send_dict()
        res = json.loads(res.text)
        if int(res["info"]):
            self._location = Location(name = mdict["msg"]["name"],lat = mdict["msg"]["coords"]["lat"],lon = mdict["msg"]["coords"]["lon"],prv = mdict["msg"]["private"],creator = self._creator)
            self._after_submitted(None)
    #pairnw pisw location
    def get_loc(self):
        return self._location

''' These classes are implemented in pointer_app.kv '''
class Cevent_Labels(TextInput):
    pass

class Log_Inputs(TextInput):
    pass

class CMapMarker(MapMarker,ButtonBehavior):
    pass

class Profile_Layout(BoxLayout):
    _current_user = None
    def __init__(self,user,you ,**kwargs):
        super(Profile_Layout, self).__init__(**kwargs)
        #vazw ton user
        self._current_user = user
        #gia username text input
        self.ids.info_layout.username.text = str(self.ids.info_layout.username.text) + self._current_user.get_username()
        self.ids.info_layout.points.text = str(self.ids.info_layout.points.text) + str(self._current_user.get_points())
        self.ids.info_layout.friends.text = str(self.ids.info_layout.friends.text)
        #prepei na valw button gia add friend
        if you == None:
            pass
        else:
            b = Button(text='Add Friend', size_hint_y=0.05)
            b.bind(on_press = partial(self.send_friend_request, you ,self._current_user))
            self.add_widget(b)

    def send_friend_request(self,user1,user2,instance,**kwargs):#APO8HKEUONTAI TA DIPLA GTI EIMAI XAZOS
        mdict = {
            "msg" : {
                "username1":str(user1.get_username()),
                "username2":str(user2.get_username())
            }
        }
        mc = myConnection(mdict,'send_friend_request')
        res = mc.send_dict()
        res = json.loads(res.text)
        print(str(res))
        if res["info"] == '1':
            #8a paei next
            instance.disabled = True
        else:
            #8a exw message alert
            print("alert")

class First_Screen(Screen):
    usr = None
    mmlayer = None
    to_log = [False,False,False]
    info = {}

    def __init__(self, **kwargs):
        super(First_Screen, self).__init__(**kwargs)
        #vazw ton user
        #gia username text input
        self.ids.aka.us_inp.hint_text = "Username"
        self.ids.aka.us_inp.bind(focus = self.on_focus_username)
        self.ids.aka.us_inp.text = 'alexisdav'
        #gia email text input
        self.ids.aka.email_inp.hint_text = "E-mail"
        self.ids.aka.email_inp.bind(focus = self.on_focus_email)
        self.ids.aka.email_inp.text = 'aledadu@hotmail.com'
        #gia password inp
        self.ids.aka.passw_inp.hint_text = "Password"
        self.ids.aka.passw_inp.bind(focus = self.on_focus_password)
        self.ids.aka.passw_inp.text = 'Den8aKsexasw!'
        self.ids.aka.login_bttn.bind(on_press = self.send_info)#8a prepei na stelnw ke coordinates
        self.ids.aka.reg_bttn.bind(on_press = self.send_info_reg)#8a prepei na stelnw ke coordinates
        self.ids.aka.login_bttn.disabled = True#sthn arxh disabled
        self.ids.aka.reg_bttn.disabled = True#sthn arxh disabled

    def on_focus_username(self,instance,focus,**kwargs):
        if focus :
            pass
        else:
            self.check_restrictions()

    def on_focus_email(self,instance,focus,**kwargs):
        if focus :
            pass
        else:
            self.check_restrictions()

    def on_focus_password(self,instance,focus,**kwargs):
        if focus :
            pass
        else:
            self.check_restrictions()

    def check_restrictions(self):
        #gia username
        if len(self.ids.aka.us_inp.text) > 8 :
            self.to_log[0] = True
        else:
            self.to_log[0] = False
        #gia password
        reg = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$"
        match_re = re.compile(reg)
        res = re.search(match_re,self.ids.aka.passw_inp.text)
        if res :
            self.to_log[1] = True
        else:
            self.to_log[1] = False
        #gia email
        if (len(self.ids.aka.email_inp.text) > 8) and (".com" in self.ids.aka.email_inp.text) and ("@" in self.ids.aka.email_inp.text):
            self.to_log[2] = True
        else:
            self.to_log[2] = False

        if self.to_log[0] and self.to_log[1] and self.to_log[2]:
            self.ids.aka.login_bttn.disabled = False
            self.ids.aka.reg_bttn.disabled = False
        else:
            self.ids.aka.login_bttn.disabled = True
            self.ids.aka.reg_bttn.disabled = True

    def send_info(self,obj,**kwargs):
        mdict = {
            "msg" : {
                "username":str(self.ids.aka.us_inp.text),
                "password":str(self.ids.aka.email_inp.text),
                "email":str(self.ids.aka.passw_inp.text),
                "coords" : {
                    "lat" : 38.670,
                    "lon" : 22.579
                }
            }
        }
        mc = myConnection(mdict,'login')
        res = mc.send_dict()
        res = json.loads(res.text)
        if int(res["info"]):
            msc = Second_Screen(name = 'second_light', usr = User(mdict["msg"]["username"], mdict["msg"]["email"], mdict["msg"]["coords"],res["points"]))
            self.manager.add_widget(msc)
            self.manager.current = 'second_light'
            return self.manager

    def send_info_reg(self,obj,**kwargs):
        mdict = {
            "msg" : {
                "username":str(self.ids.aka.us_inp.text),
                "password":str(self.ids.aka.email_inp.text),
                "email":str(self.ids.aka.passw_inp.text),
                "coords" : {
                    "lat" : 0,
                    "lon" : 0
                }
            }
        }
        mc = myConnection(mdict,'register')
        res = mc.send_dict()
        res = json.loads(res.text)
        print(str(res))
        if res["info"] == '1':
            #8a paei next
            print("epomeno")
        else:
            #8a exw message alert
            print("alert")

class Second_Screen(Screen):
    _main_layout = None
    _user = None

    def __init__(self,usr ,**kwargs):
        super(Second_Screen, self).__init__(**kwargs)
        self._user = usr
        #vazw to map
        #prepei na kanw bind tis leitourgies twn koumpiwn
        self.ids.options_layout.map_button.bind(on_press=self.to_map)
        #profile m
        self.ids.options_layout.profile_button.bind(on_press=self.to_profile)
        #filoi mou
        #sm.children[0].ids.options_layout.friends_button.bind(on_press=partial(self.to_friends, self, self.manager))
        #requests mou
        self.ids.options_layout.friend_requ_button.bind(on_press=self.to_friend_requests)
        #locations
        #sm.children[0].ids.options_layout.locations_button.bind(on_press=partial(self.to_locations, self, self.manager))
        #vazw events
        #sm.children[0].ids.options_layout.events_button.bind(on_press=partial(self.to_events, self, self.manager))
        #ru8mizw gps
        #gps.configure(on_location=self.on_gps_location)
        #vazw map bind(on_press=partial(self.to_events, self, self.manager))
        mmap = MapView(zoom=11, lat=self._user.get_lat(), lon=self._user.get_lon(),map_source=MapSource(min_zoom=3))
        #pairnw topo8esies kontines ke tis vazw sto map
        mc = myConnection(self._user.user_dict(), 'get_locations_near')
        res = mc.send_dict()
        res = json.loads(res.text)
        for r in res :
            mmarker = CMapMarker(lon=r["lon"],lat=r["lat"],source="1mmarker.png")
            mmap.add_marker(mmarker)
        #mmap.add_layer(MapLayer())
        #gia na ftiaksw locations
        self.ids.aka.info_layout.map_opp.loc_create.bind(on_press=self.to_clocation)
        #otan 8elw na ftiaksw event ,tote mporw na create events
        self.ids.aka.info_layout.map_opp.cevent.bind(on_press=self.create_event)
        #8elw na emfanizw me kedro to position mou
        #gia na paw se position                                                                                                                                 edw prepei na vazw alla pragmata...
        self.ids.aka.info_layout.map_opp.mpos.bind(on_press=lambda instance: self.manager.children[0].ids.aka.info_layout.children[0].sync_to(MapView(zoom=11, lat=self._user.get_lat(), lon=self._user.get_lon(),map_source=MapSource(min_zoom=3))))
        #vazw map
        self.ids.aka.info_layout.add_widget(mmap)
    def to_friend_requests(self,instance,**kwargs):
        self.manager.current = 'second_light'
        #vgazw to map
        self.ids.aka.info_layout.remove_widget(self.manager.children[0].ids.aka.info_layout.children[0])
        fr = FriendsRequLayout(usr = self._user,tocallback_profile = self.to_profile_with_u)
        self.ids.aka.info_layout.add_widget(fr)
        return self.manager

    #to profile mu
    def to_profile(self,instance,**kwargs):
        self.manager.current = 'second_light'
        #vgazw to map
        self.ids.aka.info_layout.remove_widget(self.manager.children[0].ids.aka.info_layout.children[0])
        #vazw to profile
        p = Profile_Layout(user=self._user,you=None)
        self.ids.aka.info_layout.add_widget(p)
        #disable buttons
        self.ids.aka.info_layout.map_opp.loc_create.disabled = True
        self.ids.aka.info_layout.map_opp.cevent.disabled = True
        self.ids.aka.info_layout.map_opp.mpos.disabled = True
        self.ids.aka.info_layout.map_opp.friends_button.disabled = True

        return self.manager
    def to_profile_with_u(self,user,**kwargs):
        self.manager.current = 'second_light'
        #vgazw to map
        self.ids.aka.info_layout.remove_widget(self.manager.children[0].ids.aka.info_layout.children[0])
        #vazw to profile
        p = Profile_Layout(user = user,you = self._user)
        self.ids.aka.info_layout.add_widget(p)
        #disable buttons
        self.ids.aka.info_layout.map_opp.loc_create.disabled = True
        self.ids.aka.info_layout.map_opp.cevent.disabled = True
        self.ids.aka.info_layout.map_opp.mpos.disabled = True
        self.ids.aka.info_layout.map_opp.friends_button.disabled = True

        return self.manager
    #dhmiourgia event
    def create_event(self,instance,**kwargs):#den exw ftiaksei to antistoixo
        self.manager.current = 'second_light'
        #vgazw to map
        self.manager.children[0].ids.aka.info_layout.remove_widget(self.manager.children[0].ids.aka.info_layout.children[0])
        #vazw to profile
        p = Event_Creation_Layout(usr = self._user,asb = self.after_subbmited_e)
        self.manager.children[0].ids.aka.info_layout.add_widget(p)
        #disable buttons
        self.ids.aka.info_layout.map_opp.mpos.disabled = True

        return self.manager
    #meta thn epituxh dhmiourgia event
    def after_subbmited_e(self):
        self.manager.current = 'second_light'
        self.manager.children[0].ids.aka.info_layout.remove_widget(self.manager.children[0].ids.aka.info_layout.children[0])
        #vazw map & marker
        mmap = MapView(zoom=11, lat=mloc.get_lat(), lon=mloc.get_lon(),map_source=MapSource(min_zoom=3))
        mc = myConnection(self._user.user_dict(), 'get_locations_near')#hmmm...ti paizei me events?
        res = mc.send_dict()
        res = json.loads(res.text)
        for r in res :
            mmarker = CMapMarker(lon=r["lon"],lat=r["lat"],source="1mmarker.png")
            mmap.add_marker(mmarker)
        #pmarker = MapMarkerPopup( lon=mloc.get_lon(),lat=mloc.get_lat(),placeholder = mmarker)
        #mmap.add_widget( mmarker )
        #mmap.add_marker(mmarker)
        self.manager.children[0].ids.aka.info_layout.add_widget(mmap)
        self.ids.aka.info_layout.map_opp.mpos.disabled = False#to kanw pali enable
        return self.manager
    #dhmiourgia location
    def to_clocation(self,instance,**kwargs):
        #vgazw to map
        self.manager.children[0].ids.aka.info_layout.remove_widget(self.manager.children[0].ids.aka.info_layout.children[0])
        #vazw to profile
        p = Location_Creation_Layout(usr= self._user , lon = self._user.get_lon(),lat = self._user.get_lat(),asb = self.to_map)
        #p.ids.private.bind(focus=self.on_focus_private)
        self.manager.children[0].ids.aka.info_layout.add_widget(p)
        #disable ena button
        self.ids.aka.info_layout.map_opp.mpos.disabled = True
        return self.manager
    #meta thn epituxh dhmiourgia location --> to map?
    '''def after_subbmited(self):
        self.manager.current = 'second_light'
        mloc = self.manager.children[0].ids.aka.info_layout.children[0].get_loc()
        self.manager.children[0].ids.aka.info_layout.remove_widget(self.manager.children[0].ids.aka.info_layout.children[0])
        #vazw map & marker
        mmap = MapView(zoom=11, lat=mloc.get_lat(), lon=mloc.get_lon(),map_source=MapSource(min_zoom=3))
        mmarker = CMapMarker(lon=mloc.get_lon(),lat=mloc.get_lat(),source="1mmarker.png")
        mc = myConnection(self._user.user_dict(), 'get_locations_near')
        res = mc.send_dict()
        res = json.loads(res.text)
        print(str(res))
        #pmarker = MapMarkerPopup( lon=mloc.get_lon(),lat=mloc.get_lat(),placeholder = mmarker)
        mmap.add_widget( mmarker )
        #mmap.add_marker(mmarker)
        self.manager.children[0].ids.aka.info_layout.add_widget(mmap)
        return self.manager
                            '''
    #gia na phgainw se map
    def to_map(self,instance,**kwargs):
        self.manager.current = 'second_light'
        self.manager.children[0].ids.aka.info_layout.remove_widget(self.manager.children[0].ids.aka.info_layout.children[0])
        mmap = MapView(zoom=11, lat=self._user.get_lat(), lon=self._user.get_lon(),map_source=MapSource(min_zoom=3))
        #pairnw ta kontina locations
        mc = myConnection(self._user.user_dict(), 'get_locations_near')
        res = mc.send_dict()
        res = json.loads(res.text)
        for r in res :
            mmarker = CMapMarker(lon=r["lon"],lat=r["lat"],source="1mmarker.png")
            mmap.add_marker(mmarker)
        #vazw map widget
        self.manager.children[0].ids.aka.info_layout.add_widget(mmap)

        self.ids.aka.info_layout.map_opp.loc_create.disabled = False
        self.ids.aka.info_layout.map_opp.cevent.disabled = False
        self.ids.aka.info_layout.map_opp.mpos.disabled = False
        self.ids.aka.info_layout.map_opp.friends_button.disabled = False
        return self.manager

class Main_App(App):

    def build(self):
        #dhmiourgia ScreenManager
        sm = ScreenManager()
        #ta screens tou screen manager
        sm.add_widget(First_Screen(name = 'login_screen'))
        #configure ton screen manager
        sm.current = 'login_screen'
        return sm

def from_Dict_to_User(mdict,current_user):#apey8eias opws to stelnei h vash
    u =  User(mdict["username"], mdict["email"],{'lat' : mdict["lat"], 'lon' : mdict["lon"]},mdict["points"])
    if u.get_username() == current_user.get_username():
        return None
    else:
        return u

if __name__ == "__main__":
    Main_App().run()
